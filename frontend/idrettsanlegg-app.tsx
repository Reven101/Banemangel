import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, Filter, RefreshCw } from 'lucide-react';

const IdrettsanleggApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedType, setSelectedType] = useState('alle');
  const [timeFilter, setTimeFilter] = useState('alle');

  // Data basert på Gruner Fotball og Arena.club sine nettsider
  // I ekte versjon ville dette hentes fra API som skraper fotball.gruner.no og arena.club.no
  const anlegg = [
    {
      id: 1,
      navn: "Dælenenga Kunstgress",
      type: "Fotball",
      adresse: "Dælenenga, Grünerløkka, Oslo",
      kilde: "https://fotball.gruner.no/kamper-og-treninger-pa-daelenenga/",
      klubb: "Gruner Fotball",
      ledigeTider: [
        { tid: "08:00-10:00", status: "ledig", aktivitet: "" },
        { tid: "10:00-12:00", status: "opptatt", aktivitet: "Gruner G16 - trening" },
        { tid: "12:00-14:00", status: "ledig", aktivitet: "" },
        { tid: "14:00-16:00", status: "opptatt", aktivitet: "Gruner J19 - kamp" },
        { tid: "16:00-18:00", status: "ledig", aktivitet: "" },
        { tid: "18:00-20:00", status: "opptatt", aktivitet: "Gruner Senior - trening" },
        { tid: "20:00-22:00", status: "ledig", aktivitet: "" }
      ]
    },
    {
      id: 2,
      navn: "Mølleparken Grus",
      type: "Fotball",
      adresse: "Mølleparken, Grünerløkka, Oslo",
      kilde: "https://fotball.gruner.no/kamper-og-treninger-pa-daelenenga/kamper-og-treninger-pa-molleparken/",
      klubb: "Gruner Fotball",
      ledigeTider: [
        { tid: "07:00-09:00", status: "ledig", aktivitet: "" },
        { tid: "09:00-11:00", status: "opptatt", aktivitet: "Gruner G13 - trening" },
        { tid: "11:00-13:00", status: "ledig", aktivitet: "" },
        { tid: "13:00-15:00", status: "opptatt", aktivitet: "Gruner J15 - kamp vs Kjelsås" },
        { tid: "15:00-17:00", status: "ledig", aktivitet: "" },
        { tid: "17:00-19:00", status: "opptatt", aktivitet: "Gruner G14 - trening" },
        { tid: "19:00-21:00", status: "ledig", aktivitet: "" }
      ]
    },
    {
      id: 3,
      navn: "Muselunden 11-er",
      type: "Fotball",
      adresse: "Muselunden, Grünerløkka, Oslo",
      kilde: "https://arena.club.no/club/skeid/field/muselunden-11er",
      klubb: "Skeid Fotball",
      ledigeTider: [
        { tid: "08:00-10:00", status: "opptatt", aktivitet: "Skeid A-lag - trening" },
        { tid: "10:00-12:00", status: "ledig", aktivitet: "" },
        { tid: "12:00-14:00", status: "ledig", aktivitet: "" },
        { tid: "14:00-16:00", status: "opptatt", aktivitet: "Skeid G15 - kamp vs Vålerenga" },
        { tid: "16:00-18:00", status: "ledig", aktivitet: "" },
        { tid: "18:00-20:00", status: "opptatt", aktivitet: "Skeid Senior - trening" },
        { tid: "20:00-22:00", status: "ledig", aktivitet: "" }
      ]
    },
    {
      id: 4,
      navn: "Muselunden 7-er",
      type: "Fotball",
      adresse: "Muselunden, Grünerløkka, Oslo",
      kilde: "https://arena.club.no/club/skeid/field/muselunden-7er",
      klubb: "Skeid Fotball",
      ledigeTider: [
        { tid: "09:00-11:00", status: "ledig", aktivitet: "" },
        { tid: "11:00-13:00", status: "opptatt", aktivitet: "Skeid G12 - trening" },
        { tid: "13:00-15:00", status: "ledig", aktivitet: "" },
        { tid: "15:00-17:00", status: "opptatt", aktivitet: "Skeid J13 - kamp" },
        { tid: "17:00-19:00", status: "ledig", aktivitet: "" },
        { tid: "19:00-21:00", status: "opptatt", aktivitet: "Skeid Damer - trening" },
        { tid: "21:00-23:00", status: "ledig", aktivitet: "" }
      ]
    }
  ];

  const filteredAnlegg = anlegg.filter(a => {
    if (selectedType !== 'alle' && a.type !== selectedType) return false;
    if (timeFilter !== 'alle') {
      const hasLedigTime = a.ledigeTider.some(t => {
        const hour = parseInt(t.tid.split(':')[0]);
        if (timeFilter === 'morgen' && (hour < 6 || hour >= 12)) return false;
        if (timeFilter === 'ettermiddag' && (hour < 12 || hour >= 18)) return false;
        if (timeFilter === 'kveld' && hour < 18) return false;
        return t.status === 'ledig';
      });
      if (!hasLedigTime) return false;
    }
    return true;
  });

  const today = new Date();
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('no-NO', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Ledig Tid</h1>
        <p className="text-blue-100">Fotballbaner på Dælenenga, Mølleparken & Muselunden</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 shadow-sm border-b">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Picker */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded-lg px-3 py-2 flex-1"
              />
            </div>

            {/* Activity Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border rounded-lg px-3 py-2 flex-1"
              >
                <option value="alle">Alle baner</option>
                <option value="Fotball">Fotball</option>
              </select>
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 flex-1"
              >
                <option value="alle">Hele dagen</option>
                <option value="morgen">Morgen (06-12)</option>
                <option value="ettermiddag">Ettermiddag (12-18)</option>
                <option value="kveld">Kveld (18-24)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Viser {filteredAnlegg.length} baner for {formatDate(selectedDate)}
            </p>
            <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Oppdater data
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {filteredAnlegg.map(anlegg => (
            <div key={anlegg.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{anlegg.navn}</h3>
                    <p className="text-blue-600 font-medium">{anlegg.type}</p>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {anlegg.adresse}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {anlegg.klubb}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {anlegg.ledigeTider.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        slot.status === 'ledig'
                          ? 'bg-green-50 text-green-700 border-2 border-green-200'
                          : 'bg-red-50 text-red-700 border-2 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        {slot.tid}
                      </div>
                      <div className="text-xs text-center">
                        {slot.status === 'ledig' ? '✅ Ledig' : '❌ Opptatt'}
                      </div>
                      {slot.aktivitet && (
                        <div className="text-xs text-center mt-1 text-gray-600 truncate">
                          {slot.aktivitet}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {anlegg.ledigeTider.some(t => t.status === 'ledig') && (
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <a 
                      href={anlegg.kilde} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline"
                    >
                      Se på {anlegg.klubb === 'Gruner Fotball' ? 'gruner.no' : 'arena.club'} →
                    </a>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Planlegg aktivitet
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAnlegg.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Ingen ledige baner funnet
            </h3>
            <p className="text-gray-500">
              Prøv å endre dato eller tidsfilter for å se flere resultater.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 mt-12 p-6 text-center text-sm text-gray-600">
        <p className="mb-2">Data hentet fra: 
          <a href="https://fotball.gruner.no" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">fotball.gruner.no</a> og 
          <a href="https://arena.club.no" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">arena.club.no</a>
        </p>
        <p className="mb-2">Sist oppdatert: i dag kl. 14:30</p>
        <p>Har du funnet feil i informasjonen? <span className="text-blue-600 cursor-pointer hover:underline">Gi oss beskjed</span></p>
      </div>
    </div>
  );
};

export default IdrettsanleggApp;