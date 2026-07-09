"use client";

import { useState } from "react";
import { Calculator, Home, MapPin, MessageCircle, Phone, TrendingUp, Sparkles } from "lucide-react";

const NEIGHBORHOODS = [
  { name: "Kemalpaşa", pricePerSqm: 42000 },
  { name: "Yeni Mahalle", pricePerSqm: 42000 },
  { name: "Esentepe", pricePerSqm: 41000 },
  { name: "Hamidiye", pricePerSqm: 40000 },
  { name: "Mahmudiye", pricePerSqm: 40000 },
  { name: "Ertuğrul Gazi", pricePerSqm: 40000 },
  { name: "Alanyurt", pricePerSqm: 37000 },
  { name: "Yunusemre", pricePerSqm: 37000 },
  { name: "Mesudiye", pricePerSqm: 31000 },
  { name: "Turgutalp", pricePerSqm: 31000 },
  { name: "Diğer", pricePerSqm: 30000 },
];

export default function HomeValueCalculator() {
  const [neighborhood, setNeighborhood] = useState("");
  const [propertyType, setPropertyType] = useState("daire");
  const [sqm, setSqm] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [result, setResult] = useState<{
    min: number;
    max: number;
    avg: number;
    pricePerSqm: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!neighborhood || !sqm) return;

    const selected = NEIGHBORHOODS.find((n) => n.name === neighborhood);
    if (!selected) return;

    const sqmNum = parseFloat(sqm);
    const ageNum = parseFloat(buildingAge) || 0;

    // Base price
    let basePrice = selected.pricePerSqm * sqmNum;

    // Age adjustment (older = cheaper)
    if (ageNum > 20) basePrice *= 0.75;
    else if (ageNum > 10) basePrice *= 0.85;
    else if (ageNum > 5) basePrice *= 0.95;

    // Property type adjustment
    if (propertyType === "villa") basePrice *= 1.3;
    if (propertyType === "mustakil") basePrice *= 1.15;

    const min = Math.round(basePrice * 0.9);
    const max = Math.round(basePrice * 1.1);
    const avg = Math.round(basePrice);

    setResult({ min, max, avg, pricePerSqm: selected.pricePerSqm });
  };

  const whatsappMessage = result
    ? `Merhaba, evimin değerlemesini yaptım.\n\nMahalle: ${neighborhood}\nTip: ${propertyType}\nm²: ${sqm}\nTahmini: ${result.min.toLocaleString("tr-TR")} - ${result.max.toLocaleString("tr-TR")} ₺\n\nDetaylı değerleme almak istiyorum.`
    : "";

  return (
    <section id="home-value" className="py-16 md:py-20 bg-gradient-to-b from-primary-green-softer/30 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-green-softer text-primary-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Calculator className="w-4 h-4" />
              <span>ÜCRETSİZ DEĞERLEME</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Evinizin Değerini <span className="text-primary-green">Hemen Öğrenin</span>
            </h2>
            <p className="text-lg text-text-muted mb-6">
              Kısaca birkaç bilgi verin, İnegöl emlak piyasasındaki ortalama değerini saniyeler içinde görün.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Bölge Bazlı Hesaplama</h4>
                  <p className="text-sm text-text-muted">İnegöl'ün tüm mahalleleri için güncel piyasa verileri</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Anlık Sonuç</h4>
                  <p className="text-sm text-text-muted">Formu doldurun, tahmini değeri hemen görün</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Ücretsiz ve Bağlayıcı Değil</h4>
                  <p className="text-sm text-text-muted">Hiçbir yükümlülük altına girmezsiniz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 md:p-8">
            {!result ? (
              <form onSubmit={calculate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Mahalle
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-primary focus:outline-none focus:border-primary-green"
                  >
                    <option value="">Mahalle Seçiniz</option>
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.name} value={n.name}>{n.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Emlak Tipi
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "daire", label: "Daire" },
                      { value: "mustakil", label: "Müstakil" },
                      { value: "villa", label: "Villa" },
                    ].map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setPropertyType(t.value)}
                        className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          propertyType === t.value
                            ? "bg-primary-green text-white shadow-md"
                            : "bg-gray-50 text-text-muted hover:bg-gray-100"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Brüt m²
                    </label>
                    <input
                      type="number"
                      value={sqm}
                      onChange={(e) => setSqm(e.target.value)}
                      placeholder="120"
                      required
                      min="20"
                      max="1000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Bina Yaşı
                    </label>
                    <input
                      type="number"
                      value={buildingAge}
                      onChange={(e) => setBuildingAge(e.target.value)}
                      placeholder="10"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-green"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-premium-green w-full py-4 rounded-xl text-white font-bold text-base transition hover:opacity-95 cursor-pointer shadow-subtle"
                >
                  💰 Değerini Hesapla
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-primary-green-softer text-primary-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>TAHMİNİ DEĞER</span>
                </div>
                <div className="text-sm text-text-muted mb-2 font-medium">Evinizin tahmini piyasa değeri:</div>
                <div className="text-4xl font-black text-primary-green mb-1">
                  {(result.min / 1000000).toFixed(1)}M - {(result.max / 1000000).toFixed(1)}M ₺
                </div>
                <div className="text-sm text-text-muted mb-6 font-semibold">
                  Ortalama: {result.avg.toLocaleString("tr-TR")} ₺
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left border border-gray-100 font-body text-xs font-semibold">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-text-muted">Mahalle</div>
                      <div className="font-bold text-text-primary">{neighborhood}</div>
                    </div>
                    <div>
                      <div className="text-text-muted">m² Fiyatı</div>
                      <div className="font-bold text-text-primary">{result.pricePerSqm.toLocaleString("tr-TR")} ₺</div>
                    </div>
                    <div>
                      <div className="text-text-muted">Toplam m²</div>
                      <div className="font-bold text-text-primary">{sqm} m²</div>
                    </div>
                    <div>
                      <div className="text-text-muted">Emlak Tipi</div>
                      <div className="font-bold text-text-primary capitalize">{propertyType}</div>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-text-muted mb-4 leading-relaxed font-semibold">
                  💡 Kesin değerleme için ofisimize gelin veya arayın. Ücretsizdir!
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3 font-body text-xs font-bold">
                  <a
                    href="tel:+905335187357"
                    className="btn-premium-green py-3 rounded-xl text-white flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-95 shadow-subtle"
                  >
                    <Phone className="w-4 h-4" />
                    Ara
                  </a>
                  <a
                    href={`https://wa.me/905335187357?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20BD5A] py-3 rounded-xl text-white flex items-center justify-center gap-2 cursor-pointer transition shadow-subtle"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-primary-green hover:underline cursor-pointer font-bold"
                >
                  ← Yeni Hesaplama
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
