% 腕关节动态抓取轨迹规划与动画仿真
clear; clc; close all;

%% 1. 初始化物理参数与刚体树模型
L_base_offset = 0.050; % 50mm
L_tcp = 0.223;         % 223mm

robot = rigidBodyTree('DataFormat', 'column', 'MaxNumBodies', 4);

% 法兰基座
body_flange = rigidBody('flange_base');
jnt_flange = rigidBodyJoint('jnt_flange', 'fixed');
setFixedTransform(jnt_flange, trvec2tform([-L_base_offset, 0, 0])); 
body_flange.Joint = jnt_flange;
addBody(robot, body_flange, 'base');

% Joint 1: Yaw
body1 = rigidBody('yaw_link');
jnt1 = rigidBodyJoint('yaw_joint', 'revolute');
setFixedTransform(jnt1, [0, 0, 0, 0], 'mdh');
body1.Joint = jnt1;
addBody(robot, body1, 'base');

% Joint 2: Pitch
body2 = rigidBody('pitch_link');
jnt2 = rigidBodyJoint('pitch_joint', 'revolute');
setFixedTransform(jnt2, [0, -pi/2, 0, pi/2], 'mdh');
body2.Joint = jnt2;
addBody(robot, body2, 'yaw_link');

% Joint 3: Roll & TCP
body3 = rigidBody('roll_gripper_link');
jnt3 = rigidBodyJoint('roll_joint', 'revolute');
setFixedTransform(jnt3, [0, -pi/2, L_tcp, 0], 'mdh');
body3.Joint = jnt3;
addBody(robot, body3, 'pitch_link');

%% 2. 抓取任务起始点与终点设定 (单位: 弧度)
q_start = [0; 0; 0];                      % 点A: 零位 [0, 0, 0]
q_end   = [45; -60; 30] * (pi / 180);     % 点B: [45°, -60°, 30°]

t_total = 3;   % 规定在3秒内完成整个抓取动作
fps = 30;      % 动画每秒30帧
t_vec = linspace(0, t_total, t_total * fps);

%% 3. 五次多项式轨迹插值规划 (满足位置、速度、加速度边界条件)
% 关节位置轨迹预分配
q_traj = zeros(3, length(t_vec));

for joint = 1:3
    % 求解五次多项式系数 a0, a1, a2, a3, a4, a5
    q0 = q_start(joint);
    qf = q_end(joint);
    
    % 边界条件: 初始/末端速度为0，初始/末端加速度为0
    a0 = q0;
    a1 = 0;
    a2 = 0;
    a3 = (10*(qf - q0)) / (t_total^3);
    a4 = (-15*(qf - q0)) / (t_total^4);
    a5 = (6*(qf - q0)) / (t_total^5);
    
    % 生成该关节的时间历程曲线
    q_traj(joint, :) = a0 + a1*t_vec + a2*t_vec.^2 + a3*t_vec.^3 + a4*t_vec.^4 + a5*t_vec.^5;
end

%% 4. 动态正运动学解算与末端路径追踪
tcp_path = zeros(3, length(t_vec));
for k = 1:length(t_vec)
    T = getTransform(robot, q_traj(:, k), 'roll_gripper_link', 'base');
    tcp_path(:, k) = T(1:3, 4); % 记录每一时刻TCP的空间三维坐标
end

%% 5. 启动动态三维动画渲染
figure('Name', '腕关节抓取任务动态仿真', 'Position', [200, 100, 900, 700]);
set(gcf, 'Color', 'w');

% 循环刷新画面，制造动画效果
for k = 1:length(t_vec)
    clf; % 清除当前画布
    
    % 1. 绘制已走过的末端TCP历史轨迹线
    plot3(tcp_path(1, 1:k), tcp_path(2, 1:k), tcp_path(3, 1:k), 'r-', 'LineWidth', 2);
    hold on;
    
    % 2. 标记起点A和终点B的位置
    plot3(tcp_path(1, 1), tcp_path(2, 1), tcp_path(3, 1), 'go', 'MarkerSize', 8, 'MarkerFaceColor', 'g');
    plot3(tcp_path(1, end), tcp_path(2, end), tcp_path(3, end), 'bx', 'MarkerSize', 10, 'LineWidth', 2);
    
    % 3. 渲染当前帧的机器人机械结构与局部坐标系
    show(robot, q_traj(:, k), 'Frames', 'on', 'PreservePlot', false);
    
    % 4. 视角与舞台环境优化
    title(sprintf('腕关节动态抓取时程仿真 (时间: %.2f / %.1f 秒)', t_vec(k), t_total));
    xlabel('X轴 (米)'); ylabel('Y轴 (米)'); zlabel('Z轴 (米)');
    view(135, 25); % 调整至最佳透视视角
    axis([-0.1 0.3 -0.2 0.2 -0.2 0.2]);
    grid on;
    
    % 5. 控制动画播放刷新率
    drawnow;
    pause(1/fps); 
end

%% 6. 输出关节空间曲线分析图 (供简历或报告使用)
figure('Name', '关节时程曲线分析 (Quintic Profile)', 'Position', [200, 150, 600, 400]);
plot(t_vec, q_traj * (180/pi), 'LineWidth', 1.5);
legend('Yaw (关节1)', 'Pitch (关节2)', 'Roll (关节3)', 'Location', 'best');
title('关节角度随时间平滑过渡曲线 (无突变，加速度连续)');
xlabel('时间 (秒)'); ylabel('角度 (度)');
grid on;