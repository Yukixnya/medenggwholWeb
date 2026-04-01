import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'
import AppBar from '../components/AppBar'
import { img } from '../utils/theme'

const SCREEN_MAP = {

  '1': [
    {
      title: 'Relationship Impact',
      question: 'How is this relationship issue affecting you emotionally?',
      image: null,
      options: [
        { id:'rel1', text:'Frequent arguments that never fully resolve' },
        { id:'rel2', text:'Feeling emotionally neglected or unheard' },
        { id:'rel3', text:'Trust issues, jealousy or fear of betrayal' },
        { id:'rel4', text:'Difficulty expressing feelings without conflict' },
        { id:'rel5', text:'Feeling trapped, controlled or unable to leave' },
      ],
    },
    {
      title: 'Physical & Emotional Signs',
      question: 'Are you noticing these signs due to relationship stress?',
      image: null,
      options: [
        { id:'rel6',  text:'Crying frequently or feeling hopeless about future' },
        { id:'rel7',  text:'Withdrawing from friends, family or social life' },
        { id:'rel8',  text:'Physical tension — chest tightness, headaches or body pain' },
        { id:'rel9',  text:'Constant overthinking or replaying conversations' },
        { id:'rel10', text:'Low self-esteem — feeling you are not good enough' },
      ],
    },
  ],

  '2': [
    {
      title: 'Stress Symptoms',
      question: 'Which stress symptoms are you currently experiencing?',
      image: null,
      options: [
        { id:'str1', text:'Racing thoughts or inability to mentally switch off' },
        { id:'str2', text:'Irritability — getting angry or snapping easily' },
        { id:'str3', text:'Difficulty concentrating or forgetfulness' },
        { id:'str4', text:'Feeling constantly overwhelmed and unable to cope' },
        { id:'str5', text:'Physical tension — tight shoulders, jaw clenching, headaches' },
      ],
    },
    {
      title: 'Stress Triggers',
      question: 'What is primarily causing your stress? (Select all that apply)',
      image: null,
      options: [
        { id:'str6',  text:'Work pressure — deadlines, targets, toxic environment' },
        { id:'str7',  text:'Financial problems or money worries' },
        { id:'str8',  text:'Family responsibilities or caregiving burden' },
        { id:'str9',  text:'Academic pressure — exams, results, future uncertainty' },
        { id:'str10', text:'Relationship conflict at home or workplace' },
      ],
    },
  ],

  '3_301': [
    {
      title: 'PCOS Symptoms',
      question: 'Are your menstrual periods irregular — cycle longer than 35 days or unpredictable?',
      image: null,
      type: 'yesno',
      yesId: 'p_irreg_yes', noId: 'p_irreg_no',
    },
    {
      title: 'PCOS Symptoms',
      question: 'Do you miss periods for 2 months or more at times?',
      image: null,
      type: 'yesno',
      yesId: 'p_miss_yes', noId: 'p_miss_no',
    },
    {
      title: 'PCOS — Skin & Hair',
      question: 'Do you have excess facial or body hair (chin, upper lip, chest, abdomen)?',
      image: null,
      type: 'yesno',
      yesId: 'p_hair_yes', noId: 'p_hair_no',
    },
    {
      title: 'PCOS — Hair & Skin Signs',
      question: 'Which of these are you experiencing? (Select all that apply)',
      image: null,
      options: [
        { id:'p_hairloss', text:'Hair loss or hair thinning from the scalp' },
        { id:'p_acne',     text:'Acne or pimples on face, chest or back' },
        { id:'p_weight',   text:'Weight gain, especially around the abdomen' },
        { id:'p_dark',     text:'Dark skin patches on neck, underarms or groin' },
        { id:'p_fatigue',  text:'Feeling very tired even after full sleep' },
      ],
    },
    {
      title: 'PCOS — Mood & Cycle',
      question: 'Do you experience mood swings, anxiety, or fatigue around menstrual cycles?',
      image: null,
      type: 'yesno',
      yesId: 'p_mood_yes', noId: 'p_mood_no',
    },
    {
      title: 'PCOS — Weight',
      question: 'Have you gained weight easily, especially around the abdomen?',
      image: null,
      type: 'yesno',
      yesId: 'p_wt_yes', noId: 'p_wt_no',
    },
    {
      title: 'PCOS — Difficulty Conceiving',
      question: 'Are you experiencing difficulty getting pregnant or planning to conceive?',
      image: null,
      type: 'yesno',
      yesId: 'p_preg_yes', noId: 'p_preg_no',
    },
  ],

  '3_302': [
    {
      title: 'Thyroid Symptoms',
      question: 'Which thyroid-related symptoms are you experiencing?',
      image: null,
      options: [
        { id:'th1', text:'Are your menstrual periods irregular (cycle longer than 35 days or unpredictable)?' },
        { id:'th2', text:'Do you miss periods for 2 months or more at times?' },
        { id:'th3', text:'Do you have excess facial or body hair (chin, upper lip, chest, abdomen)?' },
        { id:'th4', text:'Do you suffer from persistent acne or oily skin even after teenage years?' },
        { id:'th5', text:'Do you notice hair thinning or hair loss from the scalp?' },
      ],
    },
    {
      title: 'Thyroid — Further Signs',
      question: 'Are any of these also affecting you?',
      image: null,
      options: [
        { id:'th6', text:'Have you gained weight easily, especially around the abdomen?' },
        { id:'th7', text:'Have you experienced difficulty in getting pregnant or irregular ovulation?' },
        { id:'th8', text:'Do you have dark skin patches on neck, underarms or groin?' },
        { id:'th9', text:'Do you experience mood swings, anxiety or fatigue around menstrual cycles?' },
        { id:'th10', text:'Have you been diagnosed with multiple conditions?' },
      ],
    },
  ],
  '3_303': [
    {
      title: 'Sugar / Diabetes Symptoms',
      question: 'Which of these symptoms are you experiencing?',
      image: null,
      options: [
        { id:'db1', text:'Do you feel excessive thirst frequently?' },
        { id:'db2', text:'Do you pass urine frequently, especially at night?' },
        { id:'db3', text:'Do you feel excessive hunger even after eating?' },
        { id:'db4', text:'Do you experience unusual fatigue or weakness?' },
        { id:'db5', text:'Do you notice blurred vision?' },
      ],
    },
    {
      title: 'Sugar — More Symptoms',
      question: 'Do any of these apply to you?',
      image: null,
      options: [
        { id:'db6', text:'Do your cuts or wounds heal slowly?' },
        { id:'db7', text:'Do you get frequent skin or fungal infections?' },
        { id:'db8', text:'Do you feel tingling or burning sensation in feet?' },
        { id:'db9', text:'Have your clothes or rings started feeling tighter recently?' },
        { id:'db10', text:'Do you have high stress related to work, family or finances?' },
      ],
    },
    {
      title: 'Sugar — Diet & Lifestyle',
      question: 'Tell us about your diet and lifestyle',
      image: null,
      options: [
        { id:'db_diet1', text:'I eat more than 2 meals a day' },
        { id:'db_diet2', text:'I eat fruits every day' },
        { id:'db_diet3', text:'I eat packaged food or outside meals every week' },
        { id:'db_diet4', text:'I do yoga or exercise daily' },
        { id:'db_diet5', text:'I experience sugar cravings, fatigue after meals, or dark patches on neck' },
      ],
    },
  ],

  '3_304': [
    {
      title: 'Blood Pressure — Symptoms',
      question: 'Which of these symptoms are you currently experiencing?',
      image: null,
      options: [
        { id:'bp1', text:'Frequent headaches, especially at the back of the head in the morning' },
        { id:'bp2', text:'Dizziness or feeling lightheaded when standing up' },
        { id:'bp3', text:'Blurred vision or pressure behind the eyes' },
        { id:'bp4', text:'Chest tightness or palpitations (heart pounding)' },
        { id:'bp5', text:'Shortness of breath even with mild activity' },
      ],
    },
    {
      title: 'Blood Pressure — Lifestyle',
      question: 'Which of these factors apply to your lifestyle?',
      image: null,
      options: [
        { id:'bp6', text:'High salt diet — pickles, papad, processed foods, namkeen regularly' },
        { id:'bp7', text:'Sedentary lifestyle — sitting for 6+ hours without movement' },
        { id:'bp8', text:'High stress levels at work or home — ongoing, not occasional' },
        { id:'bp9', text:'Family history of hypertension or heart disease' },
        { id:'bp10', text:'Overweight or noticeable abdominal weight gain' },
      ],
    },
  ],

  '4': [
    {
      title: 'Fever Severity',
      question: 'How severe is your fever?',
      image: null,
      type: 'single',
      options: [
        { id:'fev_mild',     text:'Mild Fever — 99°F to 100.4°F (37.2°C – 38°C) — low grade, feel tired' },
        { id:'fev_moderate', text:'Moderate Fever — 100.4°F to 102.2°F (38°C – 39°C) — body ache, chills' },
        { id:'fev_severe',   text:'Severe Fever — above 102.2°F (39°C+) — feeling very unwell, shivering' },
      ],
    },
    {
      title: 'Fever — Symptoms',
      question: 'Which symptoms are you also experiencing? (Select all that apply)',
      image: null,
      options: [
        { id:'fev_s1', text:'Headache' },
        { id:'fev_s2', text:'Weakness or body weakness' },
        { id:'fev_s3', text:'Muscle pain or body ache' },
        { id:'fev_s4', text:'Runny nose' },
        { id:'fev_s5', text:'Sore throat' },
        { id:'fev_s6', text:'Cough' },
        { id:'fev_s7', text:'Difficulty breathing' },
        { id:'fev_s8', text:'Nausea' },
        { id:'fev_s9', text:'Vomiting' },
        { id:'fev_s10', text:'Abdominal pain' },
      ],
    },
    {
      title: 'Fever — Possible Cause',
      question: 'Have you recently done any of these? (Select all that apply)',
      image: null,
      options: [
        { id:'fev_c1', text:'Eaten food from outside (restaurant, street food, or takeaway)' },
        { id:'fev_c2', text:'Consumed cold foods or drinks such as ice cream or cold drinks' },
        { id:'fev_c3', text:'Undergone severe body stress such as an intense workout or heavy physical exertion' },
        { id:'fev_c4', text:'Recently travelled to a new place or climate' },
      ],
    },
  ],

  '5_202': [
    {
      title: 'Fear of Unknown',
      question: 'What is adding pressure and fear to your studies?',
      image: null,
      options: [
        { id:'fear_low_rank',    text:'Fear of low rank or poor results' },
        { id:'parent_pressure',  text:'Pressure from parents or family expectations' },
        { id:'peer_comparison',  text:'Constant comparison with peers or classmates' },
        { id:'fear_failure',     text:'Fear of failure or repeating a year' },
      ],
    },
    {
      title: 'Concept Clarity',
      question: 'What is causing lack of clarity in your studies?',
      image: null,
      options: [
        { id:'teacher_quality',      text:'Teachers are not meeting my expected teaching standards' },
        { id:'boring_lectures',      text:'Lectures feel very boring or unengaging' },
        { id:'non_interactive_class', text:'Classes are not engaging or interactive enough' },
        { id:'board_only_teaching',  text:'Teachers mostly write on the board without explanation' },
      ],
    },
  ],

  '5': [
    {
      title: 'Diet & Meals',
      question: 'Select the meals you have throughout the day',
      image: null,
      options: [
        { id:'meal_breakfast', text:'Breakfast' },
        { id:'meal_lunch',     text:'Lunch' },
        { id:'meal_dinner',    text:'Dinner' },
        { id:'meal_snack',     text:'Afternoon Snack' },
      ],
    },
    {
      title: 'Diet Quality',
      question: 'Tell us about your diet habits',
      image: null,
      options: [
        { id:'diet_fried',    text:'I eat fried foods more than 2 days per week' },
        { id:'diet_sugary',   text:'I consume sugary foods or sweets more than 2 days per week' },
        { id:'diet_nonveg',   text:'I consume non-vegetarian food (meat, fish, eggs)' },
        { id:'diet_outside',  text:'I eat food from outside (restaurant / street food / takeaway) regularly' },
        { id:'diet_fruits',   text:'I eat fruits every day' },
      ],
    },
    {
      title: 'Lifestyle & Activity',
      question: 'Which of these lifestyle factors apply to you?',
      image: null,
      options: [
        { id:'ls_sitting',  text:'I spend long hours sitting (desk work or study)' },
        { id:'ls_stress',   text:'I have high stress related to work, family or finances' },
        { id:'ls_exercise', text:'I do yoga or exercise daily' },
        { id:'ls_major',    text:'I have experienced major stress or emotional events in the last 1–2 years' },
        { id:'ls_disease',  text:'I am suffering from Thyroid, Blood pressure or Diabetes' },
      ],
    },
  ],

  '6': [
    {
      title: 'Emergency Symptoms',
      question: '🚨 Are you experiencing any of the following RIGHT NOW?',
      image: null,
      options: [
        { id:'emg1', text:'🚨 Chest pain or tightness — severe or crushing' },
        { id:'emg2', text:'🚨 Face drooping, arm weakness, or slurred speech (stroke signs)' },
        { id:'emg3', text:'🚨 Sudden loss of consciousness or seizure' },
        { id:'emg4', text:'🚨 Severe difficulty breathing or choking' },
        { id:'emg5', text:'🚨 Uncontrolled bleeding that will not stop' },
      ],
    },
  ],

  'default': [
    {
      title: 'Your Symptoms',
      question: 'Which symptoms are you currently experiencing?',
      image: null,
      options: [
        { id:'gen1', text:'Fatigue or persistent tiredness throughout the day' },
        { id:'gen2', text:'Headache or dizziness' },
        { id:'gen3', text:'Digestive issues — bloating, acidity, or constipation' },
        { id:'gen4', text:'Sleep problems — trouble falling or staying asleep' },
        { id:'gen5', text:'Unexplained weight changes — gain or loss' },
      ],
    },
    {
      title: 'Duration & Severity',
      question: 'How long have you been experiencing these symptoms?',
      image: null,
      type: 'single',
      options: [
        { id:'dur_days',   text:'Less than a week — recent onset' },
        { id:'dur_weeks',  text:'1–4 weeks — ongoing for a while' },
        { id:'dur_months', text:'More than a month — chronic or recurring' },
      ],
    },
  ],
}

function getScreens(categoryId, subCategoryId) {
  const subKey = subCategoryId ? `${categoryId}_${subCategoryId}` : String(categoryId)
  return SCREEN_MAP[subKey] || SCREEN_MAP[String(categoryId)] || SCREEN_MAP['default']
}

function IconCheck({ size = 16, color = '#fff' }) {
  return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
  )
}
function IconArrowRight({ size = 20 }) {
  return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
  )
}
function IconChevronLeft({ size = 20 }) {
  return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
  )
}

export default function PatientInputScreen() {
  const nav = useNavigate()
  const { userData, setUserData } = useGlobalStore()

  const screens = getScreens(
      userData?.selectedCategoryId,
      userData?.selectedSubCategoryId
  )

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const screen = screens[step]

  function select(id) {
    setAnswers(prev => {
      const current = new Set(prev[step] || [])

      if (current.has(id)) {
        current.delete(id)
      } else {
        current.add(id)
      }

      return {
        ...prev,
        [step]: Array.from(current)
      }
    })
  }

  function next() {
    if (!answers[step] || answers[step].length === 0) return

    if (step === screens.length - 1) {
      const allIds = Object.values(answers).flat()

      setUserData({
        ...userData,
        allSelectedIds: allIds
      })

      nav('/solution')
    } else {
      setStep(step + 1)
    }
  }

  return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F5F7FF'
      }}>

        {/* IMAGE */}
        {screen.image && (
            <img
                src={screen.image}
                style={{
                  width: '100%',
                  height: '40vh',
                  objectFit: 'cover'
                }}
            />
        )}

        {/* CONTENT */}
        <div style={{
          flex: 1,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>

          {/* QUESTION */}
          <h2 style={{
            fontSize: 18,
            fontWeight: 700
          }}>
            {screen.question}
          </h2>

          {/* OPTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {screen.options.map(opt => (
                <button
                    key={opt.id}
                    onClick={() => select(opt.id)}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: answers[step]?.includes(opt.id)
                          ? '2px solid #1976D2'
                          : '2px solid #E5E7EB',
                      background: answers[step]?.includes(opt.id)
                          ? '#E3F2FD'
                          : '#fff',
                      fontWeight: 600,
                      textAlign: 'left'
                    }}
                >
                  {opt.text}
                </button>
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button
              onClick={next}
              style={{
                marginTop: 20,
                padding: 16,
                borderRadius: 12,
                background: '#1976D2',
                color: '#fff',
                fontWeight: 700,
                border: 'none'
              }}
          >
            {step === screens.length - 1 ? 'Get Result' : 'Next'}
          </button>

        </div>
      </div>
  )
}