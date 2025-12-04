import { 
  Snail, Feather, Eye, Compass, PauseCircle, Shuffle, Waves, Cloud, BookOpen 
} from 'lucide-react';
import { Principle, Language } from './types';

// Shared color themes
const THEMES = [
  { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", iconBg: "bg-green-200", hover: "hover:bg-green-100" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", iconBg: "bg-amber-200", hover: "hover:bg-amber-100" },
  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", iconBg: "bg-orange-200", hover: "hover:bg-orange-100" },
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", iconBg: "bg-purple-200", hover: "hover:bg-purple-100" },
  { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-800", iconBg: "bg-pink-200", hover: "hover:bg-pink-100" },
  { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-800", iconBg: "bg-cyan-200", hover: "hover:bg-cyan-100" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-800", iconBg: "bg-teal-200", hover: "hover:bg-teal-100" },
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-800", iconBg: "bg-rose-200", hover: "hover:bg-rose-100" },
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", iconBg: "bg-blue-200", hover: "hover:bg-blue-100" },
];

const ICONS = [Snail, Feather, Eye, Compass, PauseCircle, Shuffle, Waves, Cloud, BookOpen];

export const UI_TEXT = {
  tr: {
    headerTitle: "Anat Baniel Metodu",
    headerSubtitle: "9 Temel Prensip (Essentials)",
    headerDesc: "Beyni uyandırmanın ve potansiyelinize erişmenin anahtarları. Detaylı bir farkındalık deneyimi almak için herhangi bir karta tıklayın.",
    footerInfo: "Daha Fazla Bilgi: anatbanielmethod.com | Bu uygulama eğitim amaçlıdır.",
    footerPower: "Powered by Google Gemini 2.5 Flash",
    modalLoading: "AI size özel bir deneyim (experience) hazırlıyor...",
    modalDone: "Tamamladım",
    modalError: "Bir hata oluştu. Lütfen tekrar deneyin.",
    modalQuote: "\"Beynin en iyi öğrendiği an, her şeyin yavaşladığı ve farkındalığın arttığı andır.\"",
    clickForAI: "AI Deneyimi İçin Tıkla",
    categoryLabel: "Anat Baniel Metodu",
    fallbackTitle: "Basit Farkındalık",
    fallbackContent: "Şu anda nefesinize odaklanın. Nefes alırken omuzlarınızın nasıl hareket ettiğini fark edin. Sadece gözlemleyin, değiştirmeye çalışmayın.",
    fallbackDuration: "1 dakika",
    listenButton: "Deneyimi Dinle",
    stopButton: "Durdur",
    audioLoading: "Ses hazırlanıyor..."
  },
  en: {
    headerTitle: "Anat Baniel Method",
    headerSubtitle: "The 9 Essentials",
    headerDesc: "Keys to waking up the brain and accessing your potential. Click on any card to get a detailed mindfulness experience.",
    footerInfo: "More Info: anatbanielmethod.com | This app is for educational purposes.",
    footerPower: "Powered by Google Gemini 2.5 Flash",
    modalLoading: "AI is preparing a custom experience for you...",
    modalDone: "Done",
    modalError: "An error occurred. Please try again.",
    modalQuote: "\"The brain learns best when everything slows down and awareness increases.\"",
    clickForAI: "Click for AI Experience",
    categoryLabel: "Anat Baniel Method",
    fallbackTitle: "Simple Awareness",
    fallbackContent: "Focus on your breath right now. Notice how your shoulders move as you inhale. Just observe, do not try to change it.",
    fallbackDuration: "1 minute",
    listenButton: "Listen to Experience",
    stopButton: "Stop",
    audioLoading: "Preparing audio..."
  },
  de: {
    headerTitle: "Anat Baniel Methode",
    headerSubtitle: "Die 9 Essentials",
    headerDesc: "Schlüssel zum Aufwecken des Gehirns und zum Erschließen Ihres Potenzials. Klicken Sie auf eine Karte für ein KI-Erlebnis.",
    footerInfo: "Mehr Info: anatbanielmethod.com | Diese App dient Bildungszwecken.",
    footerPower: "Powered by Google Gemini 2.5 Flash",
    modalLoading: "KI bereitet ein spezielles Erlebnis für dich vor...",
    modalDone: "Fertig",
    modalError: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    modalQuote: "\"Das Gehirn erzeugt neue Informationen durch die Wahrnehmung von Unterschieden.\"",
    clickForAI: "Klicken für KI-Erlebnis",
    categoryLabel: "Anat Baniel Methode",
    fallbackTitle: "Einfache Achtsamkeit",
    fallbackContent: "Konzentrieren Sie sich jetzt auf Ihren Atem. Bemerken Sie, wie sich Ihre Schultern beim Einatmen bewegen. Beobachten Sie nur, versuchen Sie nicht, es zu ändern.",
    fallbackDuration: "1 Minute",
    listenButton: "Erlebnis anhören",
    stopButton: "Stoppen",
    audioLoading: "Audio wird vorbereitet..."
  }
};

const PRINCIPLES_DATA: Record<Language, {title: string, description: string}[]> = {
  tr: [
    { 
      title: "Hareket ve Dikkat", 
      description: "Sıkça hareket et ve hareket ederken ne hissettiğine dikkatini ver. Beynin milyarlarca yeni bağlantı kurmaya başlayacak, yeni olasılıklar ve dönüşüm yaratacaktır." 
    },
    { 
      title: "Yavaşlık", 
      description: "Yeni beceriler öğrenmek ve kısıtlamaları aşmak için iyice yavaşla. Hızlıyken sadece bildiğini yapabilirsin. Yavaşlık, zengin yeni nöral kalıpların oluşumunu uyarır." 
    },
    { 
      title: "Varyasyon", 
      description: "Yaptığın her şeye varyasyon (oyun, hatalar, keşif) kat. Beynin hareketlerinde, duygularında, düşüncelerinde ve eylemlerinde yeni olasılıklar yaratacaktır." 
    },
    { 
      title: "İncelik (Subtlety)", 
      description: "Hareket ederken, düşünürken ve eyleme geçerken kullandığın gücü azalt. Beyninin en ince farklılıkları algılama yeteneğini artıracak hassasiyeti geliştir." 
    },
    { 
      title: "Coşku", 
      description: "Coşku geliştirilebilir bir beceridir. Küçük şeyleri takdir etme ve onlardan keyif alma seçimidir. Önemli olanı güçlendirir ve beynine yeni öğrenilenleri kazır." 
    },
    { 
      title: "Esnek Hedefler", 
      description: "Hedefine nasıl ulaşacağını bilseydin, zaten orada olurdun. Yol boyunca beklenmedik adımları ve hataları kucakla. Bu zengin bilgiyle, hedefine ulaşma yolunu keşfet." 
    },
    { 
      title: "Öğrenme Şalteri", 
      description: "Beyin ya öğrenme modundadır ya da değildir. Şalteri AÇMAK için her durumda, tanıdık olanlarda bile, YENİ bir şey yapmayı, düşünmeyi veya öğrenmeyi bekle." 
    },
    { 
      title: "Hayal Gücü ve Rüyalar", 
      description: "Hayal et ve düşle! Hayal gücüyle, daha önce hiç var olmamış şeyleri yaratabilirsin. Rüyalar seni çağırır ve geleceğinden rehberlik eder." 
    },
    { 
      title: "Farkındalık", 
      description: "Her an ne yaptığının, duyumsadığının, düşündüğünün ve deneyimlediğinin farkında ol. Farkındalık bir eylemdir. Farkında olduğunda, tamamen canlı ve andasındır." 
    },
  ],
  en: [
    { 
      title: "Movement with Attention", 
      description: "Move often and bring attention to what you feel as you move. Your brain will start building billions of new connections, creating new possibilities and transformation." 
    },
    { 
      title: "Slow", 
      description: "Slow way down to learn new skills and overcome limitations. Fast you can only do what you already know. Slow stimulates the formation of rich new neural patterns." 
    },
    { 
      title: "Variation", 
      description: "Introduce variation (call it play, mistakes, exploration) into everything you do. Your brain will create new possibilities in your movements, feelings, thoughts, and action." 
    },
    { 
      title: "Subtlety", 
      description: "Reduce the force with which you move, think, and act. Develop greater sensitivity that will enhance your brain’s ability to perceive the finest of differences, and therefore learn." 
    },
    { 
      title: "Enthusiasm", 
      description: "Enthusiasm is a skill you can develop. It is a choice to appreciate and take delight in the small things. It amplifies what is important and grooves in new learning in your brain." 
    },
    { 
      title: "Flexible Goals", 
      description: "If you knew how to reach your goal, you’d already be there. Embrace unexpected steps and mistakes along the way. With this rich information, discover the path to achieving your goal." 
    },
    { 
      title: "The Learning Switch", 
      description: "The brain is either in a learning mode—or not. Expect that you will do, think, or learn something NEW in each situation, even familiar ones, to turn your learning switch ON." 
    },
    { 
      title: "Imagination & Dreams", 
      description: "Imagine and dream! With imagination, you can create what has never been there before. Dreams call you and guide you from your future." 
    },
    { 
      title: "Awareness", 
      description: "Become aware of what you are doing, sensing, thinking, and experiencing at any moment. Awareness is an action. When you are aware, you are fully alive and present." 
    },
  ],
  de: [
    { 
      title: "Bewegung mit Aufmerksamkeit", 
      description: "Bewege dich oft und richte deine Aufmerksamkeit darauf, was du fühlst. Dein Gehirn wird beginnen, Milliarden neuer Verbindungen aufzubauen, was neue Möglichkeiten schafft." 
    },
    { 
      title: "Langsam", 
      description: "Werde sehr langsam, um neue Fähigkeiten zu erlernen. Schnell kannst du nur das tun, was du bereits kennst. Langsamkeit stimuliert neue neuronale Muster." 
    },
    { 
      title: "Variation", 
      description: "Bringe Variation (Spiel, Fehler, Erkundung) in alles ein. Dein Gehirn wird neue Möglichkeiten in deinen Bewegungen, Gefühlen und Gedanken schaffen." 
    },
    { 
      title: "Subtilität", 
      description: "Reduziere die Kraft, mit der du dich bewegst und denkst. Entwickle eine größere Sensibilität, um feinste Unterschiede wahrzunehmen und zu lernen." 
    },
    { 
      title: "Begeisterung", 
      description: "Begeisterung ist eine Fähigkeit. Es ist eine Entscheidung, die kleinen Dinge zu schätzen. Sie verstärkt, was wichtig ist, und vertieft neues Lernen." 
    },
    { 
      title: "Flexible Ziele", 
      description: "Umarme unerwartete Schritte und Fehler auf dem Weg. Entdecke mit dieser reichen Information den Weg zum Erreichen deines Ziels." 
    },
    { 
      title: "Der Lernschalter", 
      description: "Das Gehirn ist entweder im Lernmodus – oder nicht. Erwarte, in jeder Situation etwas NEUES zu tun oder zu lernen, um den Lernschalter einzuschalten." 
    },
    { 
      title: "Vorstellungskraft & Träume", 
      description: "Stelle dir vor und träume! Mit Vorstellungskraft kannst du erschaffen, was noch nie da war. Beide werden dich zu neuen Höhen heben." 
    },
    { 
      title: "Bewusstheit", 
      description: "Werde dir dessen bewusst, was du in jedem Moment tust und erlebst. Bewusstheit ist eine Handlung. Wenn du bewusst bist, bist du voll lebendig und präsent." 
    },
  ]
};

export const getPrinciples = (lang: Language): Principle[] => {
  return PRINCIPLES_DATA[lang].map((data, index) => ({
    id: index + 1,
    ...data,
    icon: ICONS[index],
    colorTheme: THEMES[index]
  }));
};