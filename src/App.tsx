/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionItem {
  name: string;
  hasTooltip?: boolean;
  hasIcon?: boolean;
}

interface Section {
  title: string;
  subtitle?: string;
  items: (string | SectionItem)[];
}

const sectionsData: Section[] = [
  {
    title: "أفضل وسائل الراحة",
    subtitle: "نعلم أن وسائل الراحة هذه تشجع الضيوف على الحجز. أخبرنا إذا كانت متوفرة في بعض أو كل غرفك.",
    items: [
      "شرفة", "حوض استحمام", "إطلالة", "تلفزيون بشاشة مسطحة", "مسبح خاص", "تراس", "غلاية كهربائية", "حوض سبا"
    ]
  },
  {
    title: "مرافق الغرفة",
    items: [
      { name: "أسرة الأطفال", hasTooltip: true },
      "مقبس بجانب السرير", "منشر للغسيل", "سرير قابل للطي", "سرير أريكة", "سلة مهملات", "مسبح بمياه دافئة", "مسبح غير متناهي", "مسبح على السطح", "مسبح بمياه مالحة", "مسبح مع إطلالة", "مسبح غطس", "مناشف المسبح", "مسبح ضحل", "غطاء المسبح", "منطقة جلوس", "مدفأة", "أرض مغطاة بالسجاد", "أريكة", "أرض خشبية أو باركيه", "مروحة", "مكواة", "تدفئة", "غرف متصلة", "ناموسية", "مدخل خاص", "صندوق أمانات", "خزانة ملابس", "بطانية كهربائية", "بياضات أسرّة", "وسادة خالية من الريش", "وسادة من الريش", "وسادة مضادة للحساسية"
    ]
  },
  {
    title: "حمّام",
    items: [
      "حمّام خاص", "حمّام مشترك", "لوازم استحمام مجانية", "مرحاض إضافي", "مجفف شعر", "مرحاض مشترك", "شطافة", "دش", "نعال", "مرحاض", "حمّام إضافي", "فرشاة أسنان", "شامبو", "بلسم", "صابون للجسم", "غطاء رأس للاستحمام"
    ]
  },
  {
    title: "ميديا وتكنولوجيا",
    items: [
      { name: "مشغل ألعاب - PS4", hasTooltip: true },
      { name: "مشغل ألعاب - Wii U", hasTooltip: true },
      { name: "مشغل ألعاب - Xbox One", hasTooltip: true },
      "كمبيوتر", "مشغل ألعاب", "نينتندو وي - Nintendo Wii", "مشغل ألعاب - PS2", "مشغل ألعاب - PS3", "مشغل ألعاب - Xbox 360", "لابتوب", "آيباد - iPad", "قنوات كابل", "مشغل CD", "مشغل DVD", "فاكس", "قاعدة للآيباد - iPad", "خزانة لابتوب", "قنوات مدفوعة", "راديو", "قنوات فضائية", "هاتف", "تلفزيون", "فيديو", "ألعاب فيديو", "مشغل بلو راي - Blu-ray", "نقطة اتصال شخصية (Hotspot) للهاتف المحمول", "خدمة بث (مثل Netflix)"
    ]
  },
  {
    title: "مأكولات ومشروبات",
    items: [
      "منطقة لتناول الطعام", "طاولة طعام", "كؤوس النبيذ", "زجاجة مياه", "شوكولاتة أو بسكويت", "فواكه", "قهوة أو شاي", "مرافق شواء", "فرن", "موقد", "محمصة خبز", "غسالة صحون", "منطقة طعام خارجية", "أثاث خارجي", "ميني بار", "مطبخ", "مطبخ صغير", "أدوات مطبخ", "ميكروويف", "ثلاجة", "آلة صنع الشاي / القهوة", "آلة صنع القهوة", "كرسي مرتفع للأطفال"
    ]
  },
  {
    title: "الخدمات والإضافات",
    items: [
      { name: "بطاقات الدخول", hasIcon: true },
      { name: "منبه", hasIcon: true },
      { name: "مفاتيح الدخول", hasIcon: true },
      "إمكانية الدخول إلى الصالة التنفيذية", "ساعة منبهة", "خدمة إيقاظ", "خدمة إيقاظ / ساعة منبهة", "بياضات أسرّة", "مناشف", "مناشف / بياضات (بتكلفة إضافية)"
    ]
  },
  {
    title: "إطلالة خارجية وإطلالات",
    items: [
      "باحة", "إطلالة على المدينة", "إطلالة على الحديقة", "إطلالة على البحيرة", "إطلالة على معلم", "إطلالة على الجبل", "إطلالة على المسبح", "إطلالة على النهر", "إطلالة على البحر", "إطلالة على فناء داخلي", "إطلالة على شارع هادئ"
    ]
  },
  {
    title: "سهولة الوصول",
    items: [
      "يمكن الوصول بالمصعد", "تقع هذه الوحدة بالكامل في الطابق الأرضي", "يمكن الوصول لكامل الوحدة عن طريق الكرسي المتحرك", "ملائمة لذوي الاحتياجات السمعية الخاصة", "يمكن الوصول إلى الطوابق العلوية عن طريق المصعد", "يمكن الوصول إلى الطوابق العلوية عن طريق السلالم فقط", "حوض استحمام ملائم لذوي الاحتياجات الخاصة", "حبل طوارئ في الحمّام", "مرحاض بمستوى مرتفع", "حوض منخفض", "دش ملائم لذوي الاحتياجات الخاصة", "كرسي دش", "مرحاض بمقابض", "دش"
    ]
  },
  {
    title: "خدمات عائلية وترفيهية",
    items: [
      "بوابات سلامة للأطفال", "كتب أو دي في دي أو موسيقى للأطفال", "ألعاب لوحية / ألغاز", "مقابس محمية للأطفال"
    ]
  },
  {
    title: "الأمان والحماية",
    items: [
      "كاشف أول أكسيد الكربون", "مصدر طاقة", 
      { name: "أجهزة إنذار الدخان", hasIcon: true }, 
      { name: "طفاية حريق", hasIcon: true }
    ]
  },
  {
    title: "وسائل الأمان",
    items: [
      "أجهزة تنقية الهواء"
    ]
  },
  {
    title: "التباعد المكاني",
    items: [
      "كل غرفة مجهزة بوحدة تكييف مستقلة"
    ]
  },
  {
    title: "التنظيف والتعقيم",
    items: [
      "يتوفر معقم لليدين"
    ]
  }
];

const ButtonGroup = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group" dir="rtl">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={`px-4 py-1.5 text-sm font-medium border ${
          value === 'all'
            ? 'bg-[#0071c2] text-white border-[#0071c2]'
            : 'bg-white text-[#0071c2] border-[#0071c2] hover:bg-blue-50'
        } rounded-r-md focus:z-10 transition-colors`}
      >
        جميع الغرف
      </button>
      <button
        type="button"
        onClick={() => onChange('some')}
        className={`px-4 py-1.5 text-sm font-medium border-y border-l ${
          value === 'some'
            ? 'bg-[#0071c2] text-white border-[#0071c2]'
            : 'bg-white text-[#0071c2] border-[#0071c2] hover:bg-blue-50'
        } focus:z-10 transition-colors`}
      >
        بعض الغرف
      </button>
      <button
        type="button"
        onClick={() => onChange('none')}
        className={`px-4 py-1.5 text-sm font-medium border-y border-l ${
          value === 'none'
            ? 'bg-[#0071c2] text-white border-[#0071c2]'
            : 'bg-white text-[#0071c2] border-[#0071c2] hover:bg-blue-50'
        } rounded-l-md focus:z-10 transition-colors`}
      >
        لا يوجد
      </button>
    </div>
  );
};

const FacilityItem: React.FC<{ item: any, selection: string, onChange: (val: string) => void }> = ({ item, selection, onChange }) => {
  const name = typeof item === 'string' ? item : item.name;
  const hasIcon = typeof item === 'object' && item.hasIcon;
  const hasTooltip = typeof item === 'object' && item.hasTooltip;

  return (
    <div className="flex flex-col py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm text-gray-800">{name}</span>
          {hasIcon && (
            <span className="mr-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded">
              جديد
            </span>
          )}
          {hasTooltip && (
            <Info className="w-4 h-4 text-[#0071c2] mr-2 cursor-pointer" />
          )}
        </div>
        <ButtonGroup value={selection} onChange={onChange} />
      </div>
      {selection === 'some' && (
        <div className="mt-3 p-4 border border-gray-200 rounded-md bg-[#f7f7f7] mr-2 md:mr-8">
          <p className="text-sm font-bold mb-3">حدد الغرف التي يتوفر بها هذا المرفق</p>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="ml-2 w-4 h-4 accent-[#0071c2] cursor-pointer" />
              <span className="text-sm text-gray-700">غرفة مزدوجة</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="ml-2 w-4 h-4 accent-[#0071c2] cursor-pointer" />
              <span className="text-sm text-gray-700">غرفة توأم</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="ml-2 w-4 h-4 accent-[#0071c2] cursor-pointer" />
              <span className="text-sm text-gray-700">غرفة ثلاثية</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

interface CollapsibleSectionProps {
  section: any;
  selections: Record<string, string>;
  handleSelection: (name: string, val: string) => void;
  forceExpand?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ section, selections, handleSelection, forceExpand }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Sync internal state with forceExpand if provided
  React.useEffect(() => {
    if (forceExpand !== undefined) {
      setIsExpanded(forceExpand);
    }
  }, [forceExpand]);

  return (
    <div className="mb-8">
      <div
        className="flex items-center justify-between cursor-pointer mb-2 group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="text-xl font-bold group-hover:text-[#0071c2] transition-colors">{section.title}</h2>
          {section.subtitle && <p className="text-sm text-gray-600 mt-1">{section.subtitle}</p>}
        </div>
        <div className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {isExpanded ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border border-gray-200 rounded-lg p-4 mt-4">
              {section.items.map((item: any, itemIdx: number) => {
                const name = typeof item === 'string' ? item : item.name;
                return (
                  <FacilityItem 
                    key={itemIdx} 
                    item={item} 
                    selection={selections[name]} 
                    onChange={(val) => handleSelection(name, val)} 
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    sectionsData.forEach((sec: Section) => {
      sec.items.forEach((item: string | SectionItem) => {
        const name = typeof item === 'string' ? item : item.name;
        initial[name] = 'all';
      });
    });
    initial['أسرة الأطفال'] = 'some';
    initial['سرير قابل للطي'] = 'none';
    return initial;
  });

  const handleSelection = (name: string, val: string) => {
    setSelections(prev => ({ ...prev, [name]: val }));
  };

  const filteredSections = sectionsData.map((section: Section) => {
    const lowerSearch = searchTerm.toLowerCase();
    const titleMatches = section.title.toLowerCase().includes(lowerSearch);
    const filteredItems = section.items.filter((item: string | SectionItem) => {
      const name = typeof item === 'string' ? item : item.name;
      return name.toLowerCase().includes(lowerSearch);
    });

    if (titleMatches || filteredItems.length > 0) {
      return {
        ...section,
        // If title matches, show all items. Otherwise show only matching items.
        displayItems: titleMatches ? section.items : filteredItems,
        isAutoExpanded: searchTerm.length > 0
      };
    }
    return null;
  }).filter((s): s is any => s !== null);

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">مرافق الغرفة</h1>
          <p className="text-sm text-gray-600">
            قد تساعد إضافة المرافق بشدة في إقناع الضيوف بالحجز لديك! حدد المرافق المتوفرة في مكان الإقامة الخاص بك أو في الموقع أدناه.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن مرفق أو خدمة"
              className="w-full p-3 pr-10 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Sections */}
        {filteredSections.map((section, idx) => (
          <CollapsibleSection 
            key={idx} 
            section={{...section, items: section.displayItems}} 
            selections={selections} 
            handleSelection={handleSelection}
            forceExpand={section.isAutoExpanded}
          />
        ))}

        {/* Save Button */}
        <div className="mt-8">
          <button className="w-full bg-[#0071c2] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
}

