document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("root");
  const roles = ["27", "R", "18", "69"];
  const state = { name: "", contact: "", badge: {}, acrylic: {}, submittedOrders: [] };

  function render() {
    app.innerHTML = \`
      <h2>Amie 系列代購</h2>
      <input placeholder="稱呼" id="name" /><br/>
      <input placeholder="噗浪或臉書帳號" id="contact" /><br/><br/>
      <h3>徽章（140元）</h3>
      \${roles.map(role => \`<label>\${role}<input type="number" min="0" id="badge-\${role}" /></label>\`).join(" ")}
      <h3>壓克力卡（145元）</h3>
      \${roles.map(role => \`<label>\${role}<input type="number" min="0" id="acrylic-\${role}" /></label>\`).join(" ")}
      <br/><br/>
      <button id="submit">送出訂單</button>
      <div id="message"></div>
      <hr/>
      <h3>📦 喊單狀況：</h3>
      <div id="orders"></div>
    \`;
    document.getElementById("submit").onclick = () => {
      state.name = document.getElementById("name").value.trim();
      state.contact = document.getElementById("contact").value.trim();
      state.badge = {}; state.acrylic = {};
      roles.forEach(role => {
        const b = parseInt(document.getElementById("badge-" + role).value) || 0;
        const a = parseInt(document.getElementById("acrylic-" + role).value) || 0;
        if (b) state.badge[role] = b;
        if (a) state.acrylic[role] = a;
      });
      const selected = Object.keys(state.badge).concat(Object.keys(state.acrylic));
      document.getElementById("message").innerText =
        selected.includes("18") || selected.includes("27")
          ? "⚠️ 您選擇了熱門角色，可能需要綁角，若需綁角將另行通知。"
          : "✅ 喊單已送出！";
      state.submittedOrders.push({
        name: state.name, contact: state.contact,
        badge: { ...state.badge }, acrylic: { ...state.acrylic }
      });
      renderOrders();
    };
  }

  function renderOrders() {
    const container = document.getElementById("orders");
    if (!container) return;
    container.innerHTML = state.submittedOrders.map(order => {
      return \`<div><strong>\${order.name}</strong>（\${order.contact}）<br/>
        徽章：\${JSON.stringify(order.badge)}<br/>
        壓克力卡：\${JSON.stringify(order.acrylic)}<br/></div><br/>\`;
    }).join("");
  }

  render();
});
