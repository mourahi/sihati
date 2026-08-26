import { Button } from '../components/Button'
import { SectionTitle } from '../components/SectionTitle'
import { siteCopy } from '../data/content'

const values = [
  {
    title: 'اللطف',
    text: 'ما كاينش عقاب على الأكل، وما كاينش «غدْوة نبدأ من الصفر». صحتي كتكلّم معاكِ بحنان: يوم عادي أحسن من أسبوع قاسي ثم انقطاع.',
  },
  {
    title: 'المغرب',
    text: 'الكسكس، الحريرة، التشريملة، النعنع، زيت الأركان… هاد المائدة هي الأصل. ما خصناش نبدّلو هويتنا باش نحسّو بالخفة. غير نعدّلو الكمية والزيت والسكر.',
  },
  {
    title: 'الواقعية',
    text: 'تمارين من الدار، مدد قصيرة، وبرامج ثلاثة أو أربعة أسابيع. بلا معدات غالية وبلا وعود «بطن مسطّح في سبعة أيام». الخطوة الصغيرة اللي تتكرّر هي اللي كتبدّل.',
  },
]

export default function About() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        eyebrow={siteCopy.brand}
        title="مساحة هادئة لجسمكِ"
        subtitle={siteCopy.tagline}
      />

      <section className="mt-12 space-y-4 leading-relaxed text-muted">
        <p>
          صحتي موقع للنساء اللي بغاو يهتمّو بجسمهن بلا قسوة: ريجيم لطيف حسب منطقة الجسم،
          رياضة تتبعينها من يوتوب وأنتي في الدار، ونصائح على المأكولات المغربية الصحية.
        </p>
        <p>
          الفكرة بسيطة: جسمكِ ما خصّوش حرب. خصّو روتين يقدّر يعيش مع العائلة، مع الخدمة،
          مع الجمعة والطاجين، ومع الأيام اللي ما عندكش فيها طاقة كثيرة.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">لمن هذا الموقع؟</h2>
        <ul className="mt-4 space-y-3 text-muted">
          <li className="rounded-[1.25rem] bg-sand/70 px-4 py-3">
            للمرأة اللي بغات تخفّف البطن أو الخصر أو الأفخاذ أو الذراعين، بخطوات واقعية.
          </li>
          <li className="rounded-[1.25rem] bg-sand/70 px-4 py-3">
            للي كتطبخ مغربي وكترفض الأنظمة اللي كتحرم الحريرة والكسكس دفعة واحدة.
          </li>
          <li className="rounded-[1.25rem] bg-sand/70 px-4 py-3">
            للمبتدئة، ولللي رجعات للرياضة بعد انقطاع، ولللي عندها غير ربع ساعة في النهار.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">قيمنا</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[1.5rem] border border-sand bg-white/70 p-5"
            >
              <h3 className="font-display text-xl font-bold text-rose-deep">{value.title}</h3>
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
            المعلومات هنا توعوية وتعليمية فقط. ما كنقدّموش تشخيصاً، وما كنوصفوش أدوية،
            وما كنضمنوش نتيجة معيّنة في الوزن أو المقاس. كل جسم مختلف: العمر، الحمل،
            الرضاعة، الغدة، السكري، ضغط الدم، المفاصل، والدورة الشهرية… كلها كتغيّر
            ما يناسبكِ.
          </p>
          <p>
            قبل ما تبدّلي أكلكِ أو تزيدّي شدة التمارين، استشيري طبيبتكِ أو أخصائية تغذية،
            خاصة إذا كنتي حامل، مرضعة، عندكِ ألم مزمن، أو تتبعين علاجاً. إذا حسّيتي بدوخة،
            ألم حاد، أو ضيق في التنفس أثناء الرياضة، توقّفي وراجعي مختصة.
          </p>
          <p>
            فيديوهات يوتوب مختارة كمثال للنشاط المنزلي؛ صحتي ما كتملّكش هاد القنوات
            وما كتعوّضش حصّة مع مدرّبة تشوف جسمكِ بعينك.
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
