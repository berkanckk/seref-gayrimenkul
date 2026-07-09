"use client";

import { useState, useEffect } from "react";
import { Percent, Wallet, Calendar, MessageCircle, Phone } from "lucide-react";

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(3000000);
  const [downPayment, setDownPayment] = useState(600000);
  const [interestRate, setInterestRate] = useState(2.5);
  const [termMonths, setTermMonths] = useState(120);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const loanAmount = propertyPrice - downPayment;
    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyRate = interestRate / 100;
    const monthly = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);

    const total = monthly * termMonths;
    const interest = total - loanAmount;

    setMonthlyPayment(monthly);
    setTotalPayment(total);
    setTotalInterest(interest);
  }, [propertyPrice, downPayment, interestRate, termMonths]);

  const loanAmount = propertyPrice - downPayment;

  return (
    <section id="mortgage" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-green-softer text-primary-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Wallet className="w-4 h-4" />
            <span>KONUT KREDİSİ HESAPLAYICI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Aylık Ödemenizi <span className="text-primary-green">Hesaplayın</span>
          </h2>
          <p className="text-lg text-text-muted font-medium">
            Konut kredisi taksitinizi hemen öğrenin, bütçenizi planlayın
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-6">Kredi Bilgileri</h3>

            <div className="space-y-6">
              {/* Property Price */}
              <div>
                <div className="flex justify-between items-center mb-2 font-body text-xs font-semibold">
                  <label className="text-sm font-semibold text-text-primary">
                    Konut Fiyatı
                  </label>
                  <span className="text-lg font-bold text-primary-green">
                    {propertyPrice.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="20000000"
                  step="100000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
                  className="w-full accent-primary-green cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1 font-semibold">
                  <span>500K ₺</span>
                  <span>20M ₺</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center mb-2 font-body text-xs font-semibold">
                  <label className="text-sm font-semibold text-text-primary">
                    Peşinat
                  </label>
                  <span className="text-lg font-bold text-primary-green">
                    {downPayment.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={propertyPrice}
                  step="50000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full accent-primary-green cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1 font-semibold">
                  <span>0 ₺</span>
                  <span>{propertyPrice > 0 ? ((downPayment / propertyPrice) * 100).toFixed(0) : 0}%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2 font-body text-xs font-semibold">
                  <label className="text-sm font-semibold text-text-primary">
                    Aylık Faiz Oranı
                  </label>
                  <span className="text-lg font-bold text-primary-green">
                    %{interestRate.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-primary-green cursor-pointer"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1 font-semibold">
                  <span>%0.5</span>
                  <span>%5.0</span>
                </div>
              </div>

              {/* Term */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-text-primary">
                    Vade
                  </label>
                  <span className="text-lg font-bold text-primary-green font-body text-xs">
                    {termMonths} ay ({(termMonths / 12).toFixed(0)} yıl)
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 font-body text-xs font-bold">
                  {[60, 120, 180, 240, 300].map((months) => (
                    <button
                      key={months}
                      onClick={() => setTermMonths(months)}
                      className={`py-2 rounded-lg transition cursor-pointer ${
                        termMonths === months
                          ? "bg-primary-green text-white shadow-md"
                          : "bg-white text-text-muted hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {months / 12}y
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl">
            <div className="mb-6">
              <div className="text-sm opacity-90 mb-1">Aylık Taksit</div>
              <div className="text-5xl font-black">
                {monthlyPayment > 0 
                  ? `${Math.round(monthlyPayment).toLocaleString("tr-TR")} ₺`
                  : "-"}
              </div>
            </div>

            <div className="space-y-3 mb-6 font-body text-xs font-bold">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm opacity-90">Kredi Tutarı</span>
                </div>
                <span className="font-bold">{loanAmount.toLocaleString("tr-TR")} ₺</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  <span className="text-sm opacity-90">Toplam Faiz</span>
                </div>
                <span className="font-bold">
                  {totalInterest > 0 
                    ? `${Math.round(totalInterest).toLocaleString("tr-TR")} ₺`
                    : "-"}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm opacity-90">Toplam Geri Ödeme</span>
                </div>
                <span className="font-bold">
                  {totalPayment > 0 
                    ? `${Math.round(totalPayment).toLocaleString("tr-TR")} ₺`
                    : "-"}
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
              <p className="text-[10px] opacity-90 leading-relaxed font-semibold">
                💡 Bu hesaplama tahmini olup bankaların güncel faiz oranlarına göre değişiklik gösterebilir. 
                Kesin bilgi için bankalarla görüşmenizi öneririz.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-body text-xs font-bold">
              <a
                href="tel:+905335187357"
                className="bg-white text-primary-green hover:bg-gray-100 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-subtle"
              >
                <Phone className="w-4 h-4" />
                Ara
              </a>
              <a
                href={`https://wa.me/905335187357?text=${encodeURIComponent(`Merhaba, ${propertyPrice.toLocaleString("tr-TR")} ₺'lik ev için kredi hesaplaması yaptım. Aylık ${Math.round(monthlyPayment).toLocaleString("tr-TR")} ₺ taksit çıktı. Detaylı bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BD5A] py-3 rounded-xl text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-subtle"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
