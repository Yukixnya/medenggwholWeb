import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'
import AppBar from '../components/AppBar'
import { img } from '../utils/theme'

function getScreensForCategory(categoryId, subCategoryId) {
  const key = subCategoryId ? `${categoryId}_${subCategoryId}` : String(categoryId)

  const ALL_SCREENS = {
    '1': [
      {
        title: 'Relationship Impact',
        question: 'How is this relationship issue affecting you emotionally?',
        image: 'assets/images/stress_man_laptop.png',
        options: [
          { id: 'rel1', text: 'Frequent arguments that never fully resolve' },
          { id: 'rel2', text: 'Feeling emotionally neglected or unheard' },
          { id: 'rel3', text: 'Trust issues, jealousy or fear of betrayal' },
          { id: 'rel4', text: 'Difficulty expressing feelings without conflict' },
          { id: 'rel5', text: 'Feeling trapped, controlled or unable to leave' },
        ],
      },
      {
        title: 'Physical & Emotional Signs',
        question: 'Are you noticing these signs due to relationship stress?',
        image: 'assets/images/headache_stress_woman.png',
        options: [
          { id: 'rel6', text: 'Crying frequently or feeling hopeless about future' },
          { id: 'rel7', text: 'Withdrawing from friends, family or social life' },
          { id: 'rel8', text: 'Physical tension — chest tightness, headaches or body pain' },
          { id: 'rel9', text: 'Constant overthinking or replaying conversations' },
          { id: 'rel10', text: 'Low self-esteem — feeling you are not good enough' },
        ],
      },
    ],

    '2': [
      {
        title: 'Stress Symptoms',
        question: 'Which stress symptoms are you currently experiencing?',
        image: 'assets/images/stress_man_laptop.png',
        options: [
          { id: 'str1', text: 'Racing thoughts or inability to mentally switch off' },
          { id: 'str2', text: 'Irritability — getting angry or snapping easily' },
          { id: 'str3', text: 'Difficulty concentrating or forgetfulness' },
          { id: 'str4', text: 'Feeling constantly overwhelmed and unable to cope' },
          { id: 'str5', text: 'Physical tension — tight shoulders, jaw clenching, headaches' },
        ],
      },
      {
        title: 'Stress Triggers',
        question: 'What is primarily causing your stress? (Select all that apply)',
        image: 'assets/images/stress_man_laptop.png',
        options: [
          { id: 'str6', text: 'Work pressure — deadlines, targets, toxic environment' },
          { id: 'str7', text: 'Financial problems or money worries' },
          { id: 'str8', text: 'Family responsibilities or caregiving burden' },
          { id: 'str9', text: 'Academic pressure — exams, results, future uncertainty' },
          { id: 'str10', text: 'Relationship conflict at home or workplace' },
        ],
      },
    ],

    '3_301': [
      {
        title: 'PCOS / PCOD Symptoms',
        question: 'Which symptoms of PCOS are you currently experiencing?',
        image: 'assets/images/pcod_period_calendar_pain.png',
        options: [
          { id: 'p1', text: 'Irregular periods — cycle longer than 35 days or unpredictable' },
          { id: 'p2', text: 'Very heavy or very light periods' },
          { id: 'p3', text: 'Excess facial or body hair (chin, upper lip, abdomen)' },
          { id: 'p4', text: 'Acne or pimples on face, chest or back' },
          { id: 'p5', text: 'Hair thinning or noticeable hair fall from scalp' },
        ],
      },
      {
        title: 'PCOS — Associated Signs',
        question: 'Do you also have these commonly associated PCOS signs?',
        image: 'assets/images/pcod_mood_swing_fatigue.png',
        options: [
          { id: 'p6', text: 'Weight gain especially around the abdomen' },
          { id: 'p7', text: 'Dark skin patches on neck, underarms or inner thighs' },
          { id: 'p8', text: 'Mood swings, anxiety or depression around periods' },
          { id: 'p9', text: 'Difficulty getting pregnant or planning to conceive' },
          { id: 'p10', text: 'Feeling very tired even after full sleep' },
        ],
      },
    ],

    '3_302': [
      {
        title: 'Thyroid Symptoms',
        question: 'Which thyroid-related symptoms are you experiencing?',
        image: 'assets/images/headache_stress_woman.png',
        options: [
          { id: 'th1', text: 'Unexplained weight gain (Hypothyroid) or weight loss (Hyperthyroid)' },
          { id: 'th2', text: 'Constant fatigue even after a full night of sleep' },
          { id: 'th3', text: 'Feeling very cold all the time OR excessive sweating and heat' },
          { id: 'th4', text: 'Hair loss, dry skin or brittle nails' },
          { id: 'th5', text: 'Visible swelling at the base of neck (goitre)' },
        ],
      },
      {
        title: 'Thyroid — Further Symptoms',
        question: 'Are you also noticing these effects?',
        image: 'assets/images/headache_stress_woman.png',
        options: [
          { id: 'th6', text: 'Slow heart rate and sluggishness (likely Hypothyroid)' },
          { id: 'th7', text: 'Rapid heartbeat, trembling hands or anxiety (likely Hyperthyroid)' },
          { id: 'th8', text: 'Constipation or very slow digestion' },
          { id: 'th9', text: 'Irregular or very heavy menstrual periods' },
          { id: 'th10', text: 'Puffy face especially around the eyes in the morning' },
        ],
      },
    ],

    '3_303': [
      {
        title: 'Diabetes Symptoms',
        question: 'Are you experiencing any of these diabetes-related symptoms?',
        image: 'assets/images/obesity_junk_food_couch.png',
        options: [
          { id: 'db1', text: 'Excessive thirst — drinking frequently but still thirsty' },
          { id: 'db2', text: 'Frequent urination, especially waking at night to urinate' },
          { id: 'db3', text: 'Unexplained weight loss despite eating normally' },
          { id: 'db4', text: 'Wounds or cuts that heal very slowly' },
          { id: 'db5', text: 'Tingling, numbness or burning sensation in hands or feet' },
        ],
      },
      {
        title: 'Diabetes Risk Factors',
        question: 'Do any of these apply to your lifestyle or health history?',
        image: 'assets/images/diet_breakfast_lunch_snack_dinner.png',
        options: [
          { id: 'db6', text: 'Family history of diabetes (parent or sibling has diabetes)' },
          { id: 'db7', text: 'High sugar diet — sweets, white rice, soft drinks daily' },
          { id: 'db8', text: 'Sedentary lifestyle with minimal physical activity' },
          { id: 'db9', text: 'Blurred vision or frequent eye fatigue / strain' },
          { id: 'db10', text: 'Recurring skin infections or slow-healing wounds' },
        ],
      },
    ],

    '3_304': [
      {
        title: 'Blood Pressure Symptoms',
        question: 'Are you currently experiencing any of these symptoms?',
        image: 'assets/images/headache_stress_woman.png',
        options: [
          { id: 'bp1', text: 'Frequent headaches, especially morning or back of head' },
          { id: 'bp2', text: 'Dizziness or lightheadedness when standing up suddenly' },
          { id: 'bp3', text: 'Nosebleeds without any injury' },
          { id: 'bp4', text: 'Shortness of breath with normal daily activities' },
          { id: 'bp5', text: 'Blurred vision or seeing spots suddenly' },
        ],
      },
      {
        title: 'Blood Pressure Risk Factors',
        question: 'Which of these risk factors apply to you?',
        image: 'assets/images/headache_stress_woman.png',
        options: [
          { id: 'bp6', text: 'High salt intake — pickles, papads, processed foods daily' },
          { id: 'bp7', text: 'Family history of hypertension or heart disease' },
          { id: 'bp8', text: 'Smoking or excessive alcohol consumption' },
          { id: 'bp9', text: 'High stress levels consistently over weeks or months' },
          { id: 'bp10', text: 'Obesity or significant overweight' },
        ],
      },
    ],

    '4': [
      {
        title: 'Diet & Eating Habits',
        question: 'Which eating habits currently apply to you? (Be honest — no judgment)',
        image: 'assets/images/diet_breakfast_lunch_snack_dinner.png',
        options: [
          { id: 'ob1', text: 'I eat fried or oily food frequently (3+ times per week)' },
          { id: 'ob2', text: 'I consume sweets, desserts or sugary drinks daily' },
          { id: 'ob3', text: 'I skip breakfast and eat very large meals at night' },
          { id: 'ob4', text: 'I snack on biscuits, chips or packaged foods between meals' },
          { id: 'ob5', text: 'I eat out or order delivery 4+ times per week' },
        ],
      },
      {
        title: 'Physical Activity Level',
        question: 'What describes your current activity level?',
        image: 'assets/images/exercise_gym_running.png',
        options: [
          { id: 'ob6', text: 'I sit for 8+ hours daily at office or while studying' },
          { id: 'ob7', text: 'I do very little or no exercise whatsoever' },
          { id: 'ob8', text: 'I tried exercising before but stopped due to fatigue or injury' },
          { id: 'ob9', text: 'I walk regularly but do no gym or structured exercise' },
          { id: 'ob10', text: 'I exercise 3+ times per week already' },
        ],
      },
      {
        title: 'Weight-Related Health Issues',
        question: 'Are you experiencing any of these because of your weight?',
        image: 'assets/images/obesity_junk_food_couch.png',
        options: [
          { id: 'ob11', text: 'Joint pain in knees, hips or ankles when walking' },
          { id: 'ob12', text: 'Breathlessness when climbing stairs or walking briskly' },
          { id: 'ob13', text: 'Loud snoring or waking up still tired (sleep apnoea)' },
          { id: 'ob14', text: 'Low confidence or self-esteem related to body image' },
          { id: 'ob15', text: 'Diagnosed with diabetes, BP or cholesterol already' },
        ],
      },
    ],

    '5_501': [
      {
        title: 'Cold Symptoms',
        question: 'Which cold symptoms are you currently having?',
        image: 'assets/images/cold_girl_shivering.png',
        options: [
          { id: 'c1', text: 'Runny or blocked nose with clear or thick mucus' },
          { id: 'c2', text: 'Frequent sneezing' },
          { id: 'c3', text: 'Sore, itchy or scratchy throat' },
          { id: 'c4', text: 'Watery or irritated eyes' },
          { id: 'c5', text: 'Low-grade fever or feeling feverish' },
        ],
      },
      {
        title: 'Cold Severity & Duration',
        question: 'How long have you had this cold and what might have caused it?',
        image: 'assets/images/cold_girl_shivering.png',
        options: [
          { id: 'c6', text: 'Started today or yesterday — very recent onset' },
          { id: 'c7', text: 'Going on for 3–5 days already' },
          { id: 'c8', text: 'More than a week — not improving despite rest' },
          { id: 'c9', text: 'Got wet in rain or exposed to cold weather before this' },
          { id: 'c10', text: 'Was around someone else who had a cold recently' },
        ],
      },
    ],

    '5_502': [
      {
        title: 'Type of Cough',
        question: 'What type of cough are you experiencing?',
        image: 'assets/images/nausea_vomiting_woman.png',
        options: [
          { id: 'co1', text: 'Dry cough with no mucus or phlegm at all' },
          { id: 'co2', text: 'Wet or productive cough with mucus or phlegm' },
          { id: 'co3', text: 'Blood-stained mucus when coughing (mention this to doctor immediately)' },
          { id: 'co4', text: 'Cough that is worse at night or early morning' },
          { id: 'co5', text: 'Cough after eating or when lying down (possible acid reflux)' },
        ],
      },
      {
        title: 'Associated Cough Symptoms',
        question: 'Are you also experiencing any of these?',
        image: 'assets/images/nausea_vomiting_woman.png',
        options: [
          { id: 'co6', text: 'Wheezing sound when breathing out' },
          { id: 'co7', text: 'Chest tightness or pain while coughing hard' },
          { id: 'co8', text: 'Shortness of breath along with the cough' },
          { id: 'co9', text: 'Fever along with the cough' },
          { id: 'co10', text: 'Cough lasting more than 3 weeks' },
        ],
      },
    ],

    '5_503': [
      {
        title: 'Fever Severity',
        question: 'What is the severity of your fever?',
        image: 'assets/images/fever_mild_moderate_severe.png',
        options: [
          { id: 'fv1', text: 'Low-grade fever below 100°F — mild' },
          { id: 'fv2', text: 'Moderate fever 100–103°F' },
          { id: 'fv3', text: 'High fever above 103°F — see a doctor today' },
          { id: 'fv4', text: 'Chills and shivering along with fever' },
          { id: 'fv5', text: 'Severe body ache and muscle pain' },
        ],
      },
      {
        title: 'Fever Warning Signs',
        question: 'Are you also experiencing any of these alongside fever?',
        image: 'assets/images/fever_mild_moderate_severe.png',
        options: [
          { id: 'fv6', text: 'Skin rash or spots appearing on body with fever' },
          { id: 'fv7', text: 'Severe headache and neck stiffness (emergency — call 112)' },
          { id: 'fv8', text: 'Vomiting and diarrhoea along with fever' },
          { id: 'fv9', text: 'Fever returning every day at the same time (possible malaria/dengue)' },
          { id: 'fv10', text: 'No urination or very dark yellow urine (dehydration warning)' },
        ],
      },
    ],

    '6': [
      {
        title: '⚠️ Critical Symptoms',
        question: 'Are you or someone else experiencing any of these right now?',
        image: 'assets/images/lung_health_woman.png',
        options: [
          { id: 'cr1', text: '🚨 Chest pain or tightness — possible heart attack — call 112 NOW' },
          { id: 'cr2', text: '🚨 Sudden severe headache or one-sided weakness — possible stroke' },
          { id: 'cr3', text: 'Difficulty breathing or breathlessness while at rest' },
          { id: 'cr4', text: 'Coughing or vomiting blood' },
          { id: 'cr5', text: 'Loss of consciousness or a seizure episode' },
        ],
      },
      {
        title: 'Ongoing Critical Condition',
        question: 'Is this related to a known ongoing serious condition?',
        image: 'assets/images/lung_health_woman.png',
        options: [
          { id: 'cr6', text: 'Known heart disease — chest pain worsening or new symptoms appearing' },
          { id: 'cr7', text: 'Known lung condition — breathing suddenly much worse than usual' },
          { id: 'cr8', text: 'Known kidney disease — sudden swelling or reduced/no urination' },
          { id: 'cr9', text: 'Accidental injury — severe pain, heavy bleeding or suspected fracture' },
          { id: 'cr10', text: 'Known brain condition — sudden confusion, vision loss or weakness' },
        ],
      },
    ],

    '7': [
      {
        title: 'Mental Health Symptoms',
        question: 'Which of these are you currently experiencing? This is completely confidential.',
        image: 'assets/images/headache_stress_woman.png',
        options: [
          { id: 'mh1', text: 'Persistent sadness or feeling empty for weeks without reason' },
          { id: 'mh2', text: 'Lost interest in activities or hobbies you used to enjoy' },
          { id: 'mh3', text: 'Sudden extreme mood swings — very high energy then very low' },
          { id: 'mh4', text: 'Intrusive unwanted thoughts you feel forced to act on (OCD)' },
          { id: 'mh5', text: 'Panic attacks — sudden intense fear with racing heart and breathlessness' },
        ],
      },
      {
        title: 'Impact on Daily Life',
        question: 'How is this affecting your daily functioning?',
        image: 'assets/images/stress_man_laptop.png',
        options: [
          { id: 'mh6', text: 'Unable to get out of bed or complete basic daily tasks' },
          { id: 'mh7', text: 'Completely isolating yourself from family and friends' },
          { id: 'mh8', text: 'Thoughts of self-harm or not wanting to continue living' },
          { id: 'mh9', text: 'Significant difficulty functioning at work or in studies' },
          { id: 'mh10', text: 'Using alcohol, drugs or other substances to cope' },
        ],
      },
    ],
  }

  return ALL_SCREENS[key] || ALL_SCREENS[String(categoryId)] || ALL_SCREENS['2']
}

// Modern SVG chevron icons — no Material Icons dependency for navigation
const IconChevronLeft = ({ size = 18, color = 'currentColor' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
)

const IconArrowRight = ({ size = 18, color = 'currentColor' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
)

const IconCheckCircle = ({ size = 18, color = 'currentColor' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

const IconCheck = ({ size = 13, color = 'currentColor' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
)

const IconMedical = ({ size = 64, color = '#2979FF' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.25}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
)

export default function PatientInputScreen() {
  const nav = useNavigate()
  const { userData, setUserData } = useGlobalStore()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const screens = useMemo(
      () => getScreensForCategory(userData.selectedCategoryId, userData.selectedSubCategoryId),
      [userData.selectedCategoryId, userData.selectedSubCategoryId]
  )

  const totalScreens = screens.length
  const screen = screens[currentIdx]
  const isLast = currentIdx === totalScreens - 1
  const progress = (currentIdx + 1) / totalScreens
  const pct = Math.round(progress * 100)

  function toggleOption(optId) {
    setSelectedAnswers(prev => {
      const cur = [...(prev[currentIdx] || [])]
      const pos = cur.indexOf(optId)
      if (pos >= 0) cur.splice(pos, 1)
      else cur.push(optId)
      return { ...prev, [currentIdx]: cur }
    })
  }

  function isSelected(optId) {
    return (selectedAnswers[currentIdx] || []).includes(optId)
  }

  function next() {
    if (isLast) {
      const result = {}
      screens.forEach((s, i) => {
        result[s.title] = selectedAnswers[i] || []
      })
      const allSelectedIds = Object.values(selectedAnswers).flat()
      setUserData({ inputAnswers: result, allSelectedIds })
      nav('/solution')
    } else {
      setCurrentIdx(i => i + 1)
    }
  }

  function previous() {
    if (currentIdx > 0) setCurrentIdx(i => i - 1)
    else nav(-1)
  }

  // Loading spinner while screen data resolves
  if (!screen) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '3px solid #E3F2FD',
                borderTopColor: '#2979FF',
                animation: 'spin 0.8s linear infinite',
              }}
          />
        </div>
    )
  }

  const imgSrc = img(screen.image)
  const selectedCount = (selectedAnswers[currentIdx] || []).length
  const noneId = `none_${currentIdx}`

  return (
      <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#F5F7FF',
            fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
          }}
      >
        <style>{`
        @keyframes spin   { to { transform: rotate(360deg) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }

        .q-anim  { animation: fadeUp 0.35s ease both; }

        .opt-item {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .opt-item:hover {
          transform: translateX(3px);
        }
        .opt-item:active {
          transform: scale(0.985);
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 12px;
          background: #F1F5FF;
          border: 1.5px solid #E0E7FF;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          color: #2979FF;
          font-family: inherit;
          transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
          white-space: nowrap;
        }
        .btn-back:hover {
          background: #E8EEFF;
          transform: translateX(-2px);
          box-shadow: 0 2px 8px rgba(41,121,255,0.15);
        }
        .btn-back:active {
          transform: scale(0.97);
        }

        .btn-next {
          flex: 1;
          padding: 14px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #2979FF, #0097A7);
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 5px 20px rgba(41, 121, 255, 0.38);
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .btn-next:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 26px rgba(41, 121, 255, 0.46);
        }
        .btn-next:active {
          transform: scale(0.98);
          box-shadow: 0 3px 12px rgba(41, 121, 255, 0.3);
        }
      `}</style>

        {/* AppBar */}
        <AppBar title="Health Assessment" onBack={previous} />

        {/* ── Progress section ── */}
        <div
            style={{
              background: '#fff',
              padding: '12px 20px 14px',
              borderBottom: '1px solid #F0F2F8',
            }}
        >
          <div
              style={{
                width: '100%',
                maxWidth: 640,
                margin: '0 auto',
              }}
          >
            {/* Step label + percentage */}
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2979FF, #0097A7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                >
                <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>
                  {currentIdx + 1}
                </span>
                </div>
                <span style={{ fontSize: 13, color: '#6B7280' }}>
                Step{' '}
                  <strong style={{ color: '#0A1628' }}>{currentIdx + 1}</strong>
                  {' '}of {totalScreens}
              </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2979FF, #0097A7)',
                    }}
                />
                <span style={{ fontSize: 13, fontWeight: 800, color: '#2979FF' }}>
                {pct}%
              </span>
              </div>
            </div>

            {/* Progress bar */}
            <div
                style={{
                  height: 5,
                  background: '#E8EAF6',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
            >
              <div
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, #2979FF, #0097A7)',
                    transition: 'width 0.4s ease',
                  }}
              />
            </div>

            {/* Step dots */}
            <div
                style={{
                  display: 'flex',
                  gap: 6,
                  marginTop: 8,
                  justifyContent: 'center',
                }}
            >
              {screens.map((_, i) => (
                  <div
                      key={i}
                      style={{
                        height: 4,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        width: i === currentIdx ? 20 : 8,
                        background:
                            i < currentIdx
                                ? '#2979FF'
                                : i === currentIdx
                                    ? '#0097A7'
                                    : '#E8EAF6',
                      }}
                  />
              ))}
            </div>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 18px 28px',
              maxWidth: 640,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
        >
          <div className="q-anim" key={currentIdx}>

            {/* Image + Question card */}
            <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginBottom: 14,
                  boxShadow: '0 3px 16px rgba(10,22,40,0.08)',
                }}
            >
              {/* Hero image */}
              <div
                  style={{
                    width: '100%',
                    height: 160,
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)',
                  }}
              >
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={screen.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                        onError={e => {
                          e.currentTarget.style.display = 'none'
                        }}
                    />
                ) : (
                    <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                    >
                      <IconMedical size={64} color="#2979FF" />
                    </div>
                )}

                {/* Dark gradient overlay */}
                <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                          'linear-gradient(180deg, transparent 35%, rgba(10,22,40,0.72) 100%)',
                    }}
                />

                {/* Title overlay */}
                <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
                  <div
                      style={{
                        background: 'rgba(41,121,255,0.8)',
                        borderRadius: 6,
                        padding: '2px 8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        marginBottom: 4,
                      }}
                  >
                  <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        color: '#fff',
                        letterSpacing: 0.5,
                      }}
                  >
                    QUESTION {currentIdx + 1}
                  </span>
                  </div>
                  <h3
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                  >
                    {screen.title}
                  </h3>
                </div>
              </div>

              {/* Question text + selection count */}
              <div
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
              >
                <p
                    style={{
                      fontSize: 13,
                      color: '#4B5563',
                      margin: 0,
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                >
                  {screen.question}
                </p>

                {selectedCount > 0 && (
                    <div
                        style={{
                          flexShrink: 0,
                          background: '#EEF3FF',
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#2979FF',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                    >
                      <IconCheck size={11} color="#2979FF" />
                      {selectedCount}
                    </div>
                )}
              </div>
            </div>

            {/* ── Options list ── */}
            <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  marginBottom: 20,
                }}
            >
              {screen.options.map(opt => {
                const sel = isSelected(opt.id)
                const isUrgent = opt.text.startsWith('🚨')
                return (
                    <button
                        key={opt.id}
                        className="opt-item"
                        onClick={() => toggleOption(opt.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          background: sel
                              ? isUrgent
                                  ? '#FEF2F2'
                                  : '#EEF3FF'
                              : '#fff',
                          border: `1.5px solid ${
                              sel
                                  ? isUrgent
                                      ? '#FCA5A5'
                                      : '#2979FF'
                                  : '#F0F2F8'
                          }`,
                          borderRadius: 14,
                          padding: '12px 14px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          boxShadow: sel
                              ? `0 3px 14px ${
                                  isUrgent
                                      ? 'rgba(239,68,68,0.15)'
                                      : 'rgba(41,121,255,0.15)'
                              }`
                              : 'none',
                          width: '100%',
                          fontFamily: 'inherit',
                        }}
                    >
                      {/* Checkbox */}
                      <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            flexShrink: 0,
                            background: sel
                                ? isUrgent
                                    ? '#EF4444'
                                    : '#2979FF'
                                : '#F5F7FF',
                            border: `1.5px solid ${
                                sel
                                    ? isUrgent
                                        ? '#EF4444'
                                        : '#2979FF'
                                    : '#E5E9F5'
                            }`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                      >
                        {sel && <IconCheck size={13} color="#fff" />}
                      </div>

                      <span
                          style={{
                            fontSize: 13,
                            fontWeight: sel ? 700 : 500,
                            flex: 1,
                            lineHeight: 1.45,
                            color: sel
                                ? isUrgent
                                    ? '#DC2626'
                                    : '#1D4ED8'
                                : '#374151',
                          }}
                      >
                    {opt.text}
                  </span>
                    </button>
                )
              })}

              {/* None of the above */}
              <button
                  className="opt-item"
                  onClick={() => toggleOption(noneId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: isSelected(noneId) ? '#F9FAFB' : '#fff',
                    border: `1.5px solid ${isSelected(noneId) ? '#9CA3AF' : '#F0F2F8'}`,
                    borderRadius: 14,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
              >
                <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      flexShrink: 0,
                      background: isSelected(noneId) ? '#6B7280' : '#F5F7FF',
                      border: `1.5px solid ${isSelected(noneId) ? '#6B7280' : '#E5E9F5'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                >
                  {isSelected(noneId) && <IconCheck size={13} color="#fff" />}
                </div>
                <span
                    style={{
                      fontSize: 13,
                      color: '#9CA3AF',
                      fontWeight: 500,
                      fontStyle: 'italic',
                    }}
                >
                None of the above apply to me
              </span>
              </button>
            </div>

            {/* ── Navigation buttons ── */}
            <div style={{ display: 'flex', gap: 10 }}>
              {currentIdx > 0 && (
                  <button className="btn-back" onClick={previous}>
                    <IconChevronLeft size={17} color="#2979FF" />
                    Back
                  </button>
              )}

              <button className="btn-next" onClick={next}>
                {isLast ? (
                    <>
                      <IconCheckCircle size={18} color="#fff" />
                      View My Recommendations
                    </>
                ) : (
                    <>
                      Next Question
                      <IconArrowRight size={18} color="#fff" />
                    </>
                )}
              </button>
            </div>

            {/* Skip hint */}
            <p
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#9CA3AF',
                  marginTop: 12,
                }}
            >
              You can skip a question — just tap Next without selecting
            </p>
          </div>
        </div>
      </div>
  )
}