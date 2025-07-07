import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Sparkles } from 'lucide-react';
import AdvancedWidgetDemo from '../components/AdvancedWidgetDemo';

const TodayPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('what_to_do_today')} Widget
              </h1>
              <p className="text-gray-600 mt-1">
                Pro-taseme äri pakkumised igaks päevaks
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/widget/today"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ava widget</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Advanced Widget Demo */}
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Edasijõudnud Widget Demo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Interaktiivne ja visuaalselt atraktiivne widget koos reaalajas uuenduste, 
                animatsioonide ja täiustatud kasutajaliidesega.
              </p>
            </div>
            
            <AdvancedWidgetDemo />
            
            {/* Advanced Features */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Edasijõudnud funktsioonid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1">⚡</span>
                  <div>
                    <h4 className="font-medium">Reaalajas kell</h4>
                    <p className="text-sm text-gray-600">Live kellaaeg päise alal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1">🎨</span>
                  <div>
                    <h4 className="font-medium">Animeeritud taust</h4>
                    <p className="text-sm text-gray-600">Dünaamilised visuaalsed elemendid</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1">🔄</span>
                  <div>
                    <h4 className="font-medium">Laadimisanimatsioon</h4>
                    <p className="text-sm text-gray-600">Sujuv sisu uuendus</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1">📱</span>
                  <div>
                    <h4 className="font-medium">Responsiivne disain</h4>
                    <p className="text-sm text-gray-600">Optimeeritud kõikidele seadmetele</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1">🌙</span>
                  <div>
                    <h4 className="font-medium">Tume/hele teema</h4>
                    <p className="text-sm text-gray-600">Kohandatav välimus</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1">✨</span>
                  <div>
                    <h4 className="font-medium">Hover efektid</h4>
                    <p className="text-sm text-gray-600">Interaktiivsed mikroanimatsioonid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default TodayPage; 