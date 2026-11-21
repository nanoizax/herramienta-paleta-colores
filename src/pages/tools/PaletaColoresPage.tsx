import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { extractPalette, type PaletteColor } from "@/lib/tools/colorPalette";

const PaletaColoresPage = () => {
  const { t } = useTranslation("tools");

  const [file, setFile] = useState<File | null>(null);
  const [palette, setPalette] = useState<PaletteColor[] | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleFile = async (selected: File) => {
    setFile(selected);
    setPalette(null);
    setError(null);
    setProcessing(true);
    try {
      setPalette(await extractPalette(selected));
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPalette(null);
    setError(null);
  };

  const handleCopy = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <ToolPageLayout toolId="paleta-colores">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8">
        {!file ? (
          <FileDropZone
            accept="image/jpeg,image/png,image/webp"
            label={t("ui.upload_label")}
            hint={t("ui.upload_hint")}
            onFile={handleFile}
            toolId="paleta-colores"
          />
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400 truncate max-w-[60%]">{file.name}</span>
              <Button
                variant="outline"
                onClick={reset}
                className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button")}
              </Button>
            </div>

            {processing && <p className="text-neutral-400 text-sm">{t("ui.processing")}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {palette && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {palette.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleCopy(color.hex)}
                    className="border border-neutral-800 rounded-lg overflow-hidden text-left hover:border-neutral-600 transition-colors"
                  >
                    <div className="h-16" style={{ backgroundColor: color.hex }} />
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-sm text-neutral-200 font-mono">{color.hex}</span>
                      {copiedHex === color.hex ? (
                        <Check className="w-3.5 h-3.5 text-neutral-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default PaletaColoresPage;
