// components/Controls.jsx
import { SIZES } from "../constants/sizes";
import { TEMPLATES } from "../constants/templates";

export default function Controls({
  items,
  setItems,
  title,
  setTitle,
  footer,
  setFooter,
  sizeKey,
  setSizeKey,
  templateKey,
  setTemplateKey,
}) {
  const updateItem = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), nombre: "", precio: "", icono: "" }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="controls">
      <h2>Contenido</h2>
      <label className="label-content">
        <div>Título:</div>
        <input type="text" className="contenido-label" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="label-content">
        <div>Pie:</div>
        <input type="text" className="contenido-label" value={footer} onChange={(e) => setFooter(e.target.value)} />
      </label>

      <h2>Productos</h2>
      {items.map((item) => (
        <div key={item.id} className="item-row">
          <input
            type="text"
            placeholder="Nombre"
            value={item.nombre}
            style={{ flexGrow: 2 }}
            onChange={(e) => updateItem(item.id, "nombre", e.target.value)}
          />
          <input
            type="text"
            placeholder="Precio"
            value={item.precio}
            onChange={(e) => updateItem(item.id, "precio", e.target.value)}
          />
          <select value={item.icono} onChange={(e) => updateItem(item.id, "icono", e.target.value)}>
            <option value="">Selecciona un ícono</option>
            <option value="🍅">🍅 Tomate</option>
            <option value="🥕">🥕 Zanahoria</option>
            <option value="🥬">🥬 Lechuga</option>
            <option value="🥦">🥦 Brócoli</option>
            <option value="🌽">🌽 Maíz</option>
            <option value="🍆">🍆 Berenjena</option>
            <option value="🥒">🥒 Pepino</option>
            <option value="🧄">🧄 Ajo</option>
            <option value="🧅">🧅 Cebolla</option>
            <option value="🥔">🥔 Papa</option>
            <option value="🌶️">🌶️ Ají</option>
            <option value="🫑">🫑 Pimentón</option>
          </select>
          <button className="deleteBtn" onClick={() => removeItem(item.id)}>
            🗑️
          </button>
        </div>
      ))}
      <button className="deleteBtn" onClick={addItem}>
        ➕ Añadir producto
      </button>

      <h2>Diseño</h2>
      <label>
        Tamaño:
        <select value={sizeKey} onChange={(e) => setSizeKey(e.target.value)}>
          {SIZES.map((size) => (
            <option key={size.key} value={size.key}>
              {size.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Plantilla:
        <select value={templateKey} onChange={(e) => setTemplateKey(e.target.value)}>
          {TEMPLATES.map((template) => (
            <option key={template.key} value={template.key}>
              {template.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
