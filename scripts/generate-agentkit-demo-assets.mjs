import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(process.argv[1], "..", "..");
const catalogPath = path.join(projectRoot, "generated", "agentkit-catalog.json");
const agentkitRoot = path.resolve(projectRoot, "..", "..", "agentkit");
const outputPath = path.join(projectRoot, "generated", "agentkit-demo.json");

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

function findAction(name) {
  for (const plugin of catalog.plugins ?? []) {
    const found = (plugin.actions ?? []).find((action) => action.name === name);
    if (found) return found;
  }

  for (const action of catalog.mcp ?? []) {
    if (action.name === name) return action;
  }

  return null;
}

function readPreview(relativePath, maxLines = 24) {
  const absolutePath = path.join(agentkitRoot, relativePath);
  const content = fs.readFileSync(absolutePath, "utf8");
  const lines = content.split("\n").slice(0, maxLines).join("\n").trim();
  return {
    path: relativePath,
    absolutePath,
    preview: lines,
  };
}

function buildActionBundle(actionNames) {
  return actionNames.map((name) => {
    const action = findAction(name);
    if (!action) {
      return {
        name,
        description: "Action metadata not found in generated catalog.",
        riskLevel: "unknown",
        networks: [],
        file: null,
        plugin: "unknown",
      };
    }

    return {
      name: action.name,
      description: action.description,
      riskLevel: action.riskLevel ?? "unknown",
      networks: action.networks ?? [],
      file: action.file ?? null,
      plugin: action.plugin ?? (action.name.split(".")[0] || "unknown"),
    };
  });
}

const workflows = [
  {
    id: "ring-checkout",
    title: "Smart Ring Checkout",
    badge: "x402 live path",
    judgePitch: "把智能戒指预购从页面按钮升级成 AgentKit 可编排的支付状态机。",
    businessUse: "适合预购、健康订阅月费、升级报告解锁。",
    currentMvp: "页面已具备 GOAT Testnet3 钱包连接、订单生成、签名授权和支付入口。",
    nextStep: "把真实 merchant gateway 接入 `goat.x402.payment.create`、`submitSignature`、`status`。",
    actionNames: [
      "wallet.resolve_token",
      "wallet.balance",
      "goat.x402.payment.create",
      "goat.x402.payment.submitSignature",
      "goat.x402.payment.transfer",
      "goat.x402.payment.status",
    ],
    sourceFiles: [
      readPreview("examples/x402-payment-flow/eip712-full-flow.ts", 28),
      readPreview("plugins/x402/actions/payment.create.ts", 30),
      readPreview("plugins/x402/actions/payment.submit-signature.ts", 36),
      readPreview("plugins/x402/adapters/http-merchant-gateway.ts", 42),
    ],
    userSees: [
      "用户看到智能戒指预购单、签名授权和支付状态更新的完整路径。",
      "评委看到的不只是支付按钮，而是可追踪的 x402 intent -> sign -> settle 流程。",
    ],
  },
  {
    id: "merchant-ops",
    title: "Merchant Ops Loop",
    badge: "x402-merchant growth",
    judgePitch: "把 demo 从一次性付款页扩展成可运营的订阅业务后台能力。",
    businessUse: "适合订单追踪、营收看板、webhook 开通和收款地址管理。",
    currentMvp: "页面已展示订单列表，本地可保存演示订单。",
    nextStep: "把订单状态、dashboard 和 webhook 能力接入真实 merchant portal API。",
    actionNames: [
      "goat.x402.merchant.dashboard.stats",
      "goat.x402.merchant.orders.list",
      "goat.x402.merchant.balance.get",
      "goat.x402.merchant.webhooks.create",
      "goat.x402.merchant.addresses.list",
    ],
    sourceFiles: [
      readPreview("plugins/x402-merchant/index.ts", 40),
      readPreview("plugins/x402-merchant/actions/dashboard.stats.ts", 26),
      readPreview("plugins/x402-merchant/actions/orders.list.ts", 30),
      readPreview("plugins/x402-merchant/adapters/types.ts", 30),
    ],
    userSees: [
      "团队可以解释订单怎么从支付成功流向订阅开通和发货。",
      "评委能快速理解我们已经考虑了 merchant 运营，不是只有交易瞬间。",
    ],
  },
  {
    id: "agent-trust",
    title: "Health Agent Trust Layer",
    badge: "ERC-8004 moat",
    judgePitch: "把健康建议服务注册成可追踪、可积累信誉的链上 agent。",
    businessUse: "适合把分析 agent 版本、方法论和服务信誉沉淀为长期资产。",
    currentMvp: "页面已讲清 agent 身份层的产品方向，但还没有真实上链注册。",
    nextStep: "把 `VitalScope Health Agent` 注册到测试网，并用标签化反馈积累信誉。",
    actionNames: [
      "erc8004.register_agent",
      "erc8004.set_agent_uri",
      "erc8004.set_metadata",
      "erc8004.give_feedback",
      "erc8004.get_reputation",
    ],
    sourceFiles: [
      readPreview("plugins/erc8004/actions/register-agent.ts", 30),
      readPreview("plugins/erc8004/actions/give-feedback.ts", 42),
      readPreview("plugins/erc8004/actions/get-reputation.ts", 36),
      readPreview("plugins/erc8004/addresses.ts", 28),
    ],
    userSees: [
      "用户未来可以看到分析 agent 的版本说明、适用范围和信誉标签。",
      "评委会看到我们把健康建议解释成 agent service，而不是普通内容页。",
    ],
  },
];

const output = {
  generatedAt: new Date().toISOString(),
  sourceRoot: path.relative(path.dirname(outputPath), agentkitRoot),
  foundations: catalog.foundations ?? [],
  workflows: workflows.map((workflow) => ({
    ...workflow,
    actions: buildActionBundle(workflow.actionNames),
  })),
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`wrote ${path.relative(projectRoot, outputPath)}`);
