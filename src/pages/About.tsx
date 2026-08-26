import { Button } from '../components/Button'
import { IconBlossom, IconLeaf, IconRose } from '../components/Florals'
import { SectionTitle } from '../components/SectionTitle'
import { siteCopy } from '../data/content'

const values = [
  {
    title: 'اللطف',
    text: 'ليس ثمة عقاب على الأكل، وليس ثمة «غداً أبدأ من الصفر». صحتي تخاطبكِ بلطف: يوم عادي أفضل من أسبوع قاسٍ ثم انقطاع.',
    Icon: IconRose,
  },
  {
    title: 'المغرب',
    text: 'الكسكس، والحريرة، والتشريملة، والنعناع، وزيت الأركان… هذه المائدة هي الأصل. لا حاجة إلى تبديل هويتنا كي نشعر بالخفة. حسبُنا أن نعدّل الكمية والزيت والسكر.',
    Icon: IconBlossom,
  },
  {
    title: 'الواقعية',
    text: 'تمارين من المنزل، ومدد قصيرة، وبرامج من ثلاثة أو أربعة أسابيع. من دون معدات غالية ومن دون وعود «بطن مسطّح في سبعة أيام». الخطوة الصغيرة التي تتكرر هي التي تُحدث الفرق.',
    Icon: IconLeaf,
  },
]

export default function About() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16">
      <SectionTitle
        eyebrow={siteCopy.brand}
        title="مساحة هادئة لجسمكِ"
        subtitle={siteCopy.tagline}
      />

      <section className="mt-12 space-y-4 leading-relaxed text-muted">
        <p>
          صحتي موقع للنساء اللواتي يرغبن في العناية بجسمهن من دون قسوة: برنامج غذائي لطيف حسب منطقة الجسم،
          ورياضة تتابعينها على يوتيوب وأنتِ في المنزل، ونصائح حول المأكولات المغربية الصحية.
        </p>
        <p>
          الفكرة بسيطة: جسمكِ لا يحتاج حرباً. يحتاج روتيناً يعيش مع العائلة، ومع العمل،
          ومع جمعة الطاجين، ومع الأيام التي لا تجدين فيها طاقة كثيرة.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">لمن هذا الموقع؟</h2>
        <ul className="mt-4 space-y-3 text-muted">
          <li className="flex items-start gap-2 rounded-[1.25rem] bg-sand/70 px-4 py-3">
            <IconBlossom className="mt-1 h-3.5 w-3.5 shrink-0 text-rose/70" />
            للمرأة التي تريد تخفيف البطن أو الخصر أو الأفخاذ أو الذراعين، بخطوات واقعية.
          </li>
          <li className="flex items-start gap-2 rounded-[1.25rem] bg-sand/70 px-4 py-3">
            <IconBlossom className="mt-1 h-3.5 w-3.5 shrink-0 text-rose/70" />
            لمن تطبخ الطعام المغربي وترفض الأنظمة التي تحرّم الحريرة والكسكس دفعة واحدة.
          </li>
          <li className="flex items-start gap-2 rounded-[1.25rem] bg-sand/70 px-4 py-3">
            <IconBlossom className="mt-1 h-3.5 w-3.5 shrink-0 text-rose/70" />
            للمبتدئة، ولمن عادت إلى الرياضة بعد انقطاع، ولمن ليس لديها سوى ربع ساعة في اليوم.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">قيمنا</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[1.5rem] border border-sand bg-paper/70 p-5"
            >
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-rose-deep">
                <value.Icon className="h-5 w-5 shrink-0 text-rose" />
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[1.5rem] border border-gold/30 bg-sand/80 px-5 py-6">
        <h2 className="font-display text-2xl font-bold text-ink">تنبيه طبي مهم</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <p>{siteCopy.disclaimer}</p>
          <p>
            المعلومات هنا توعوية وتعليمية فقط. لا نقدّم تشخيصاً، ولا نصف أدوية،
            ولا نضمن نتيجة معيّنة في الوزن أو المقاس. كل جسم مختلف: العمر، والحمل،
            والرضاعة، والغدة، والسكري، وضغط الدم، والمفاصل، والدورة الشهرية… كلها تغيّر
            ما يناسبكِ.
          </p>
          <p>
            قبل أن تغيّري أكلكِ أو تزيدي شدة التمارين، استشيري طبيبتكِ أو أخصائية تغذية،
            خاصة إن كنتِ حاملاً أو مرضعة، أو كان لديكِ ألم مزمن، أو كنتِ تتبعين علاجاً. إذا أحسستِ بدوخة،
            أو ألم حاد، أو ضيق في التنفس أثناء الرياضة، توقّفي وراجعي مختصة.
          </p>
          <p>
            فيديوهات يوتيوب مختارة كمثال للنشاط المنزلي؛ صحتي لا تملك هذه القنوات
            ولا تغني عن حصة مع مدرّبة ترى جسمكِ بعينها.
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button variant="primary" to="/programs">
          ابدئي ببرنامج
        </Button>
        <Button variant="ghost" to="/nutrition">
          المطبخ الصحي
        </Button>
      </div>
    </article>
  )
}
