"use client";

import { TrendingUp, Home, Trees, Wheat, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export default function MarketOverview() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-green-softer text-primary-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>YEREL PİYASA ANALİZİ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            İnegöl Emlak Piyasası
          </h2>
          <p className="text-lg text-text-muted font-medium">
            Bölgemizin güncel gayrimenkul piyasası özet verileri
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Housing */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Konut</div>
                <div className="text-xs opacity-75">Ortalama m² fiyatı</div>
              </div>
            </div>
            <div className="text-4xl font-black mb-2">38.000 ₺</div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>%25 yıllık artış</span>
            </div>
          </div>

          {/* Land */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Trees className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Arsa</div>
                <div className="text-xs opacity-75">Ortalama m² fiyatı</div>
              </div>
            </div>
            <div className="text-4xl font-black mb-2">7.594 ₺</div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>%28 yıllık artış</span>
            </div>
          </div>

          {/* Rural */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Tarla</div>
                <div className="text-xs opacity-75">Ortalama fiyat</div>
              </div>
            </div>
            <div className="text-4xl font-black mb-2">277K ₺</div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>%20 yıllık artış</span>
            </div>
          </div>
        </div>

        {/* Top Neighborhoods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Premium Neighborhoods */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-text-primary">Premium Bölgeler</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: "Kemalpaşa", price: "42.000 ₺", change: 30 },
                { name: "Yeni Mahalle", price: "42.000 ₺", change: 28 },
                { name: "Esentepe", price: "41.000 ₺", change: 27 },
                { name: "Hamidiye", price: "40.000 ₺", change: 25 },
                { name: "Mahmudiye", price: "40.000 ₺", change: 26 },
              ].map((n, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-primary-green-softer rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-text-primary">{n.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary-green">{n.price}/m²</div>
                    <div className="text-xs text-emerald-600 flex items-center gap-0.5 justify-end">
                      <TrendingUp className="w-3 h-3" />
                      %{n.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Opportunities */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-text-primary">Yatırım Fırsatları</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: "Akhisar", detail: "Yeni gelişen bölge", type: "Arsa" },
                { name: "Yeniceköy", detail: "Villa yapımı uygun", type: "Arsa" },
                { name: "Alanyurt", detail: "Aile dostu, geniş daireler", type: "Konut" },
                { name: "Cerrah", detail: "Uygun fiyatlı arsa", type: "Arsa" },
                { name: "Sarıpınar", detail: "Merkeze yakın tarla", type: "Tarla" },
              ].map((n, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-amber-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center">
                      ⭐
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary text-sm">{n.name}</div>
                      <div className="text-xs text-text-muted">{n.detail}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-white text-text-muted px-2 py-1 rounded-md border border-gray-200">
                    {n.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] text-text-muted mt-8">
          * Fiyatlar Şeref Gayrimenkul piyasa deneyimine dayalıdır. Güncel bilgi için bizimle iletişime geçin.
        </p>
      </div>
    </section>
  );
}
