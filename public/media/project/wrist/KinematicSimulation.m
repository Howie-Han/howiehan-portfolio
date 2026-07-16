% =========================================================================
% 6-DoF Kinematics Simulation using Peter Corke's Robotics Toolbox
% 构型: 经典 PUMA560 前三轴定位 + 自定义 3-DoF 刚柔耦合空间球腕关节
% 修复了 RTB 新版本 'fast' 参数不兼容导致白屏的问题
% 优化：将摄像机视角旋转 180 度，确保红色轨迹线在画面正前方无遮挡展示
% =========================================================================
clear; clc; close all;

%% 1. 建立基于 PUMA 560 比例的 D-H 参数模型
% 参数顺序: Link([theta, d, a, alpha])

% --- 前三轴：基于 PUMA 560 标准参数，提供协调的机械臂基座 ---
L(1) = Link([0,  0.67,    0,       pi/2 ]); % 腰关节 (Waist)
L(2) = Link([0,  0,       0.4318,  0    ]); % 肩关节 (Shoulder)
L(3) = Link([0,  0.15005, 0.0203, -pi/2 ]); % 肘关节 (Elbow)

% --- 后三轴：你的刚柔耦合球腕关节 ---
% 严格满足 Pieper 准则 (a4=a5=a6=0, d5=d6=0)，三轴严格交于同一点
% d4 = 0.4318 (PUMA小臂长度) + 0.05m (你设定的腕关节法兰基座偏置) = 0.4818m
L(4) = Link([0,  0.4818,  0,       pi/2 ]); % 腕 Yaw
L(5) = Link([0,  0,       0,      -pi/2 ]); % 腕 Pitch
L(6) = Link([0,  0,       0,       0    ]); % 腕 Roll

% 注入严格的关节限位 (匹配你的设定)
L(4).qlim = [-pi, pi];                 % Yaw: [-180, 180]
L(5).qlim = [-95*pi/180, 0];           % Pitch: [-95, 0] (严格限制仅向下)
L(6).qlim = [-pi, pi];                 % Roll: [-180, 180]

% 实例化机器人
robot = SerialLink(L, 'name', 'PUMA560 + Custom Wrist');

% 设定 TCP：三轴交点沿末端夹爪轴(Z轴)向外延伸 223mm (0.223m)
robot.tool = transl(0, 0, 0.223);

%% 2. 轨迹规划 (关节空间平滑插值 jtraj)
% 挑选远离奇异点且姿态变化丰富的起始与终止位姿
q_start = [0,    -pi/4, -pi/4,  0,    -pi/4,  0   ];
q_end   = [pi/3, -pi/6, -pi/3,  pi/3, -pi/6,  pi/2];
frames = 60;

% 五次多项式平滑插值，保证速度、加速度连续
[q_traj, ~, ~] = jtraj(q_start, q_end, frames);

%% 3. 计算末端 TCP 坐标 (完美兼容所有版本 RTB)
tcp_pos = zeros(3, frames);
for i = 1:frames
    % 获取当前帧的正运动学变换矩阵
    T = robot.fkine(q_traj(i,:)); 
    
    % 兼容 RTB 10+ (SE3对象) 与 老版本 (4x4矩阵)
    if isa(T, 'SE3')
        tcp_pos(:, i) = T.t; % 提取位移向量
    else
        tcp_pos(:, i) = T(1:3, 4); % 从 4x4 矩阵提取位移
    end
end

%% 4. 极简工业风可视化与 GIF 导出
figure('Name', 'Kinematics Simulation', 'Color', 'w', 'Position', [100 100 800 600]);
gif_filename = 'wrist-sim-kinematics.gif';

for i = 1:frames
    % 1. 绘制机械臂 (已删除报错的 'fast' 参数)
    robot.plot(q_traj(i,:), ...
        'workspace', [-0.8 1.0 -0.8 1.0 -0.2 1.5], ... % 锁定视野，防止乱晃
        'nobase', 'noshadow');
    
    % 2. 强制绘制红线：每次都把 1 到 i 的点连起来，覆盖在模型之上
    hold on;
    plot3(tcp_pos(1, 1:i), tcp_pos(2, 1:i), tcp_pos(3, 1:i), ...
        'r-', 'LineWidth', 2.5);
    hold off;
    
    % 【关键修改】：将摄像机方位角(Azimuth)旋转至135度，仰角(Elevation)保持25度
    % 彻底解决机械臂遮挡红色轨迹线的问题
    view([135, 25]);
    
    drawnow;
    
    % 3. 捕获并写入 GIF
    frame = getframe(gcf);
    im = frame2im(frame);
    [imind, cm] = rgb2ind(im, 256);
    if i == 1
        imwrite(imind, cm, gif_filename, 'gif', 'Loopcount', inf, 'DelayTime', 0.05);
    else
        imwrite(imind, cm, gif_filename, 'gif', 'WriteMode', 'append', 'DelayTime', 0.05);
    end
end

disp('=> wrist-sim-kinematics.gif 生成完毕！');
disp('视角已翻转 180 度，红色轨迹现在处于画面绝对 C 位！');