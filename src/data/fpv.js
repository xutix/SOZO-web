import { Broadcast, Cube, PaperPlaneTilt, SlidersHorizontal } from "@phosphor-icons/react";

export const flightCapabilities = [
  [
    Cube,
    "整机搭建",
    "从真实机架、动力与载荷需求出发完成整机配置。",
    ["结构与载荷匹配", "动力系统配置"],
  ],
  [
    SlidersHorizontal,
    "飞控调试",
    "完成飞控参数、姿态响应与飞行手感调校。",
    ["滤波与 PID", "模式与失控保护"],
  ],
  [
    Broadcast,
    "图传链路",
    "围绕视频传输、天线和现场链路进行验证。",
    ["链路与天线布置", "现场干扰验证"],
  ],
  [
    PaperPlaneTilt,
    "展示飞行",
    "提供活动飞行、拉烟、拉旗与互动演示。",
    ["飞行脚本与安全区", "现场执行与保障"],
  ],
];
