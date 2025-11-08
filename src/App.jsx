import { useMemo, useState } from "react";
import { SIZES } from "./constants/sizes";
import { TEMPLATES } from "./constants/templates";
import { downloadBlob } from "./utils/download";
import useFlyerRenderer from "./hooks/useFlyerRenderer";
import Controls from "./components/Controls.jsx";
import CanvasPreview from "./components/CanvasPreview.jsx";
import "./index.css";
const DEFAULT_ITEMS = [];

export default function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [title, setTitle] = useState("OFERTAS DE HOY");
  const [footer, setFooter] = useState("Pedidos por WhatsApp");
  const [sizeKey, setSizeKey] = useState("chat-square");
  const [templateKey, setTemplateKey] = useState("leafy");

  const size = useMemo(() => SIZES.find((s) => s.key === sizeKey), [sizeKey]);
  const template = useMemo(() => TEMPLATES.find((t) => t.key === templateKey), [templateKey]);

  const { canvasRef, toDataURL, render } = useFlyerRenderer({ items, title, footer, size, template });

  const onDownload = () => downloadBlob(toDataURL(), `lista-veggies-${Date.now()}.png`);

  return (
    <div className="container">
      <header className="appbar">
        <div className="spacer" />
        {/* <button className="btn primary" onClick={render}>
          Actualizar
        </button> */}
        <button className="btn" onClick={onDownload}>
          Descargar PNG
        </button>
      </header>

      <main className="grid">
        <section className="panel">
          <Controls
            items={items}
            setItems={setItems}
            title={title}
            setTitle={setTitle}
            footer={footer}
            setFooter={setFooter}
            sizeKey={sizeKey}
            setSizeKey={setSizeKey}
            templateKey={templateKey}
            setTemplateKey={setTemplateKey}
          />
        </section>
        <section className="panel preview">
          <CanvasPreview canvasRef={canvasRef} onRender={render} />
        </section>
      </main>
    </div>
  );
}
