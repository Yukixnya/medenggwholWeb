import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'
import AppBar from '../components/AppBar'

function buildSolution(userData) {
  const catId  = userData.selectedCategoryId
  const subId  = userData.selectedSubCategoryId
  const subKey = subId ? `${catId}_${subId}` : String(catId)
  const ids    = new Set(userData.allSelectedIds || [])
  const has    = (...keys) => keys.some(k => ids.has(k))

  const catName = userData.selectedCategoryName || 'Health'
  const subName = userData.selectedSubCategoryName || ''
  const title   = subName ? `Recommendations for ${subName}` : `Recommendations for ${catName}`

  if (catId === 1) {
    const sections = []

    if (has('rel1','rel4')) sections.push({
      emoji: '💬', title: 'Improve Communication',
      color: '#FFF0F3', border: '#F48FB1',
      items: [{
        title: 'How to Communicate Better',
        tips: [
          'Use "I feel..." statements — "I feel hurt when..." instead of "You always..."',
          'Pick a calm moment to talk — never during anger or conflict',
          'Practice active listening: listen fully before responding, don\'t interrupt',
          'Write down your feelings before difficult conversations to stay clear',
          'Set a 10-minute "no interruption" rule — each person speaks without being cut off',
        ],
      }],
    })

    if (has('rel2','rel5','rel10')) sections.push({
      emoji: '🧠', title: 'Rebuild Self-Worth',
      color: '#EDE7F6', border: '#CE93D8',
      items: [{
        title: 'Protecting Your Emotional Health',
        tips: [
          'Your feelings are valid — feeling neglected or trapped is not "too sensitive"',
          'Set clear personal boundaries — it is healthy and necessary in all relationships',
          'Identify 3 things you value about yourself — write them down daily',
          'Spend time with people outside the relationship who make you feel good',
          'Professional counselling for relationship issues shows strength, not weakness',
        ],
      }],
    })

    if (has('rel3')) sections.push({
      emoji: '🤝', title: 'Rebuilding Trust',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Steps to Restore Trust',
        tips: [
          'Trust is rebuilt through consistent small actions over time — not one big gesture',
          'Be transparent and predictable — do what you say you will do',
          'Avoid checking phones or social media of partner — this breaks trust further',
          'Consider couples therapy with a trained therapist — very effective for trust issues',
          'Give the other person space to earn trust — healing is not instant',
        ],
      }],
    })

    if (has('rel6','rel7','rel8','rel9')) sections.push({
      emoji: '🌿', title: 'Manage Emotional Stress',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Daily Emotional Self-Care',
        tips: [
          'Journaling for 10 minutes daily helps process painful emotions without rumination',
          'Exercise — even a 20-minute walk — reduces cortisol and emotional tension significantly',
          'Limit talking about the problem with the same people repeatedly — it deepens the pain',
          'Try box breathing: inhale 4 counts, hold 4, exhale 4, hold 4 — repeat 4 times',
          'Talk to a therapist or counsellor — relationship pain is real and professional help works',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'When to Seek Professional Help',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'See a Counsellor or Therapist If',
        tips: [
          'You have been feeling this way for more than 2–3 weeks without improvement',
          'The conflict involves any form of physical, emotional or verbal abuse',
          'You are having thoughts of self-harm or harming others',
          'You feel completely unable to function at work or in daily life',
          'Children are being exposed to ongoing conflict at home',
        ],
      }],
    })

    return { title, sections }
  }

  if (catId === 2) {
    const sections = []

    if (has('str1','str3')) sections.push({
      emoji: '🧘', title: 'Calm the Racing Mind',
      color: '#EDE7F6', border: '#CE93D8',
      items: [{
        title: 'Techniques to Quieten Mental Noise',
        tips: [
          '4-7-8 breathing: inhale for 4 counts, hold for 7, exhale slowly for 8 — repeat 4 times',
          'Brain dump: write every worry on paper for 5 minutes — removes it from mental RAM',
          'Schedule "worry time" — 15 minutes per day to think about problems, outside of that STOP',
          'Mindfulness meditation for 10 minutes daily proven to reduce anxiety by 30–40%',
          'Digital detox: no phone for 30 minutes before bed — blue light and news increase anxiety',
        ],
      }],
    })

    if (has('str2','str4')) sections.push({
      emoji: '⚙️', title: 'Manage Overwhelm',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Practical Overwhelm Management',
        tips: [
          'Write tomorrow\'s 3 most important tasks tonight — focus only on those first',
          'Use the 2-minute rule: if a task takes under 2 minutes, do it immediately',
          'Say NO to non-essential commitments — your time and energy are finite resources',
          'Break large tasks into 25-minute focused blocks (Pomodoro technique)',
          'Stop multitasking — it increases stress hormones and reduces output quality',
        ],
      }],
    })

    if (has('str5')) sections.push({
      emoji: '💪', title: 'Release Physical Tension',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Physical Stress Relief',
        tips: [
          'Progressive muscle relaxation: tense then release each muscle group from feet to face',
          'Neck and shoulder stretches for 5 minutes every 2 hours if desk-based work',
          '30 minutes of brisk walking reduces cortisol (stress hormone) by up to 50%',
          'Hot shower or bath in the evening activates the parasympathetic nervous system',
          'Limit caffeine after 2pm — it amplifies physical tension and disrupts sleep',
        ],
      }],
    })

    if (has('str6')) sections.push({
      emoji: '💼', title: 'Work Stress Solutions',
      color: '#FFF3E0', border: '#FFCC80',
      items: [{
        title: 'Managing Workplace Stress',
        tips: [
          'Identify your top 3 work stressors — most problems are actually 2–3 recurring issues',
          'Have a direct, calm conversation with your manager about workload if it is unsustainable',
          'Take a proper lunch break away from your screen — even 20 minutes is restorative',
          'Separate work and personal time strictly — no emails after a fixed hour',
          'If the environment is genuinely toxic, begin quietly planning your next career move',
        ],
      }],
    })

    if (has('str9')) sections.push({
      emoji: '📚', title: 'Academic Stress Management',
      color: '#F3E5F5', border: '#CE93D8',
      items: [{
        title: 'For Students Under Pressure',
        tips: [
          'Create a realistic study timetable — 45 minutes of study with 15-minute breaks',
          'Stop comparing your progress to classmates — your journey is your own',
          'Exercise the day before important exams — improves recall and reduces anxiety',
          'Talk to a trusted teacher or counsellor — academic stress is extremely common',
          'Remember: one exam or result does NOT define your entire future or worth',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'When to See a Doctor',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Seek Professional Help If',
        tips: [
          'Stress has lasted more than 4 weeks with no improvement',
          'You are using alcohol, food or substances to cope with stress',
          'Physical symptoms — chest pain, hair loss, persistent headaches — are present',
          'You are having thoughts of harming yourself or giving up',
          'Stress is seriously affecting your work, relationships or health',
        ],
      }],
    })

    return { title, sections }
  }

  if (subKey === '3_301' || (catId === 3 && subId === 301)) {
    const sections = []

    sections.push({
      emoji: '🍽️', title: 'PCOS Diet Protocol',
      color: '#FCE4EC', border: '#F48FB1',
      items: [{
        title: 'What to Eat and Avoid',
        tips: [
          'AVOID: white rice, white bread, maida, sweets, sugary drinks, packaged juices — these spike insulin',
          'EAT: brown rice, whole wheat roti, oats, daliya — complex carbs that release energy slowly',
          'Increase protein: eggs, lentils, paneer, Greek yoghurt — helps control hunger and insulin',
          'Anti-inflammatory foods: turmeric (haldi), ginger, berries, leafy greens reduce PCOS inflammation',
          'Eat every 3–4 hours — never skip meals — blood sugar stability is crucial for PCOS',
        ],
      }],
    })

    sections.push({
      emoji: '🏃', title: 'Exercise for PCOS',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Best Exercise Types for PCOS',
        tips: [
          'Start with 30 minutes of brisk walking daily — most effective low-impact option for PCOS',
          'Strength training 2–3 times per week reduces insulin resistance (key issue in PCOS)',
          'Yoga: Supta Baddha Konasana, Bhujangasana and Balasana specifically help hormonal balance',
          'Avoid extreme cardio or HIIT if you feel constantly exhausted — gentle consistency is better',
          'Swimming and cycling are excellent low-impact options if joints hurt',
        ],
      }],
    })

    if (has('p3','p4','p5')) sections.push({
      emoji: '💆', title: 'Managing PCOS Symptoms',
      color: '#EDE7F6', border: '#CE93D8',
      items: [{
        title: 'Skin, Hair and Hormonal Symptom Management',
        tips: [
          'Excess hair (hirsutism): spearmint tea (2 cups daily) shown to reduce androgens naturally',
          'Acne from PCOS: avoid dairy and high-GI foods — both worsen hormonal acne',
          'Hair fall: ensure adequate iron, zinc and Vitamin D levels — get blood test done',
          'Inositol supplement (Myo-inositol + D-chiro-inositol) very effective — consult doctor first',
          'Dark skin patches (acanthosis nigricans) indicate insulin resistance — priority to control sugar',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'When to See a Gynaecologist',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Do Not Delay — See a Doctor If',
        tips: [
          'Periods have been absent for more than 3 months (amenorrhoea)',
          'You are trying to conceive and have not succeeded after 6 months of regular trying',
          'Hirsutism or acne is very severe and affecting your quality of life significantly',
          'You suspect you may have insulin resistance or pre-diabetes alongside PCOS',
          'Get an ultrasound and hormonal blood test (LH, FSH, testosterone, insulin, AMH) done',
        ],
      }],
    })

    return { title, sections }
  }

  if (subKey === '3_302' || (catId === 3 && subId === 302)) {
    const isHypo = has('th2','th3','th6','th8')
    const isHyper = has('th7')
    const sections = []

    if (isHypo) sections.push({
      emoji: '🐢', title: 'Hypothyroid Management',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Managing Underactive Thyroid',
        tips: [
          'Take thyroid medication (levothyroxine if prescribed) every morning on empty stomach',
          'Wait 30–60 minutes before eating after medication — calcium and iron reduce absorption',
          'Avoid soy products, raw cabbage, broccoli, cauliflower — these suppress thyroid hormone',
          'Selenium-rich foods help: Brazil nuts (2 per day), sunflower seeds, tuna fish',
          'Iodine-rich foods: seaweed, iodised salt, dairy — support thyroid hormone production',
        ],
      }],
    })

    if (isHyper) sections.push({
      emoji: '🏃', title: 'Hyperthyroid Management',
      color: '#FCE4EC', border: '#F48FB1',
      items: [{
        title: 'Managing Overactive Thyroid',
        tips: [
          'Avoid iodine-rich foods (seaweed, excessive iodised salt) — they stimulate overactive thyroid',
          'Cruciferous vegetables (cabbage, broccoli) actually help hyperthyroid by slowing thyroid',
          'Avoid caffeine and stimulants completely — worsens palpitations and anxiety',
          'Calcium and Vitamin D supplementation important — hyperthyroid causes bone loss',
          'Relaxation techniques are crucial — stress significantly worsens hyperthyroid symptoms',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'Essential Next Steps',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Medical Steps Required for Thyroid',
        tips: [
          'Get a complete thyroid panel: TSH, Free T3, Free T4 — this confirms type and severity',
          'Thyroid conditions require medication — lifestyle helps but cannot replace treatment',
          'Check Vitamin D, B12, iron and calcium — thyroid affects absorption of all of these',
          'Once on medication, test thyroid levels every 3–6 months to adjust dose',
          'Never stop thyroid medication suddenly — always consult your endocrinologist first',
        ],
      }],
    })

    return { title, sections }
  }
  if (subKey === '3_303' || (catId === 3 && subId === 303)) {
    const sections = []

    sections.push({
      emoji: '🍽️', title: 'Diabetic Diet Plan',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'What a Diabetic Should Eat',
        tips: [
          'STRICT AVOID: white rice, maida, sweets, mithai, sugary drinks, fruit juices, honey',
          'EAT: bitter gourd (karela), fenugreek seeds (methi), cinnamon — all lower blood sugar naturally',
          'Eat small meals every 2–3 hours — prevents blood sugar spikes from large meals',
          'Plate rule: 50% vegetables, 25% protein (dal/egg/chicken), 25% whole grain carbs',
          'Choose whole fruits over juice — fibre slows sugar absorption significantly',
        ],
      }],
    })

    sections.push({
      emoji: '🏃', title: 'Exercise for Diabetes',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Exercise is Medicine for Diabetes',
        tips: [
          'Walk for 30 minutes after every meal — this alone reduces post-meal sugar spikes by 30%',
          'Resistance/strength training twice weekly improves insulin sensitivity significantly',
          'Never exercise on an empty stomach if on insulin or diabetes medication — risk of hypoglycaemia',
          'Check blood sugar before and after exercise when starting a new routine',
          'Yoga (especially Ardha Matsyendrasana and Mandukasana) shown to help pancreatic function',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'Critical Medical Monitoring',
      color: '#FFEBEE', border: '#EF9A9A',
      items: [{
        title: 'Non-Negotiable Medical Steps',
        tips: [
          'Get HbA1c test done — shows 3-month average blood sugar — target below 7% for most patients',
          'Check blood sugar fasting and 2 hours after meals daily if newly diagnosed',
          'Get annual eye check (diabetic retinopathy), kidney function test and foot exam',
          'Diabetes medication must be taken as prescribed — never stop or reduce dose yourself',
          'Any wound, cut or injury on feet — see a doctor the same day — diabetic wounds can be serious',
        ],
      }],
    })

    return { title, sections }
  }

  if (subKey === '3_304' || (catId === 3 && subId === 304)) {
    const sections = []

    sections.push({
      emoji: '🧂', title: 'Diet for Blood Pressure',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'DASH Diet for BP Control',
        tips: [
          'REDUCE salt drastically — less than 5g (1 teaspoon) per day total including cooked food',
          'AVOID: pickles, papads, processed foods, namkeen, salted chips, instant noodles',
          'EAT: bananas, spinach, beetroot, garlic — all proven to lower blood pressure naturally',
          'Potassium-rich foods counter sodium: sweet potato, beans, tomatoes, low-fat dairy',
          'Reduce or stop alcohol completely — even moderate drinking raises BP consistently',
        ],
      }],
    })

    sections.push({
      emoji: '🏃', title: 'Exercise & Lifestyle',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Non-Medication BP Reducers',
        tips: [
          '30 minutes of aerobic exercise daily (walking, cycling, swimming) lowers BP by 5–8 mmHg',
          'Slow deep breathing for 5 minutes twice daily activates vagus nerve and lowers BP',
          'Quit smoking immediately — every cigarette raises BP acutely for 30 minutes',
          'Maintain healthy weight — every 5kg lost reduces systolic BP by approximately 5 mmHg',
          'Reduce stress through yoga, meditation or any enjoyable leisure activity daily',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'Blood Pressure Monitoring',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Essential Medical Steps',
        tips: [
          'Buy a home BP monitor — check morning and evening and keep a diary',
          'Target BP: below 130/80 mmHg for most adults — discuss target with your doctor',
          'Never stop BP medication suddenly — can cause dangerous rebound hypertension',
          'If BP is above 180/110 mmHg with symptoms — go to emergency immediately',
          'Annual blood tests: kidney function, blood glucose, cholesterol — BP affects all these',
        ],
      }],
    })

    return { title, sections }
  }

  if (catId === 4) {
    const sections = []

    sections.push({
      emoji: '🍽️', title: 'Sustainable Eating Plan',
      color: '#FFF3E0', border: '#FFCC80',
      items: [{
        title: 'A Doctor\'s Practical Diet Advice',
        tips: [
          'Target a calorie deficit of 300–500 calories per day — this gives 0.5–1kg weight loss per week',
          'Never skip breakfast — people who eat breakfast consistently lose more weight long-term',
          'The most effective single diet change: stop all sugary drinks including juices and chai with sugar',
          'Replace one grain serving with vegetables at each meal — reduces calories without hunger',
          'Use a smaller plate — research shows this alone reduces portion size by 20–30% without effort',
        ],
      }],
    })

    if (has('ob1','ob2','ob4','ob5')) sections.push({
      emoji: '🚫', title: 'Foods to Eliminate First',
      color: '#FFEBEE', border: '#EF9A9A',
      items: [{
        title: 'Priority Foods to Reduce or Eliminate',
        tips: [
          'Week 1 goal: eliminate all sugary drinks (cold drinks, fruit juices, sweet chai/coffee)',
          'Week 2 goal: reduce fried foods to maximum once per week from daily',
          'Stop ordering food delivery more than twice per week — restaurant food is calorie-dense',
          'Replace biscuits, chips, namkeen with roasted chana, nuts, fruit for snacking',
          'Cook at home in air fryer, steam or bake instead of deep frying — same taste, far fewer calories',
        ],
      }],
    })

    if (has('ob6','ob7')) sections.push({
      emoji: '🏃', title: 'Starting Exercise (Beginner Guide)',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'How to Start Exercising When Unfit',
        tips: [
          'Week 1–2: Walk 20 minutes daily — this is your only goal. Do not attempt more yet.',
          'Week 3–4: Increase to 30–40 minutes and add 2 days of basic bodyweight exercises',
          'Strength training matters more than cardio for long-term weight management',
          'Do NOT start with an extreme gym routine — injury or burnout kills motivation in week 1',
          'Consistency beats intensity: 30 minutes daily for 6 months beats 2 hours for 2 weeks',
        ],
      }],
    })

    if (has('ob11','ob12','ob13')) sections.push({
      emoji: '🔬', title: 'Medical Assessment',
      color: '#F3E5F5', border: '#CE93D8',
      items: [{
        title: 'Medical Tests to Discuss With Your Doctor',
        tips: [
          'Request: thyroid panel, fasting blood sugar, HbA1c, cholesterol panel, Vitamin D and B12',
          'Sleep apnoea linked to obesity — if you snore loudly, a sleep study may be needed',
          'Joint pain from obesity: physiotherapy and weight loss are more effective than painkillers',
          'Calculate your BMI (weight in kg ÷ height in metres²) — BMI above 30 is clinical obesity',
          'Consider a referral to a bariatric physician for professional structured weight management plan',
        ],
      }],
    })

    sections.push({
      emoji: '🧠', title: 'Psychology of Weight Loss',
      color: '#EDE7F6', border: '#CE93D8',
      items: [{
        title: 'The Mental Side (Equally Important)',
        tips: [
          'Emotional eating — eating when bored, sad or stressed — must be addressed first',
          'Identify your specific trigger situations and plan alternative responses in advance',
          'Set non-scale goals: "I want to climb stairs without breathlessness" — keeps motivation alive',
          'Track food in a simple diary for just 2 weeks — awareness alone changes eating habits',
          'One bad day is not failure — the people who succeed are the ones who restart immediately',
        ],
      }],
    })

    return { title, sections }
  }

  if (subKey === '5_501' || (catId === 5 && subId === 501)) {
    const sections = []

    sections.push({
      emoji: '🤧', title: 'Cold Treatment',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Effective Home Treatment for Cold',
        tips: [
          'Steam inhalation twice daily with 2–3 drops of eucalyptus oil — clears nasal congestion fast',
          'Honey + ginger + lemon tea with hot water 3 times daily — natural antiviral and decongestant',
          'Saline nasal rinse (neti pot or saline spray) — removes virus from nasal passages directly',
          'Stay warm and rest — your immune system needs energy to fight infection',
          'Gargle with warm salted water (1 tsp salt in 1 glass) 3 times daily for sore throat',
        ],
      }],
    })

    sections.push({
      emoji: '💊', title: 'Medications if Needed',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Safe Over-the-Counter Options',
        tips: [
          'Paracetamol (Crocin/Dolo 650) for fever or body ache — safe, effective, every 6 hours',
          'Cetirizine (Okacet / Zyrtec) for runny nose and sneezing — take at night due to drowsiness',
          'Nasal decongestant spray (Otrivin) — use maximum 3 days only to avoid rebound congestion',
          'Vitamin C 500mg daily shortens cold duration — start at first symptoms',
          'Zinc lozenges within 24 hours of cold onset shown to reduce duration by 30–40%',
        ],
      }],
    })

    if (has('c7','c8')) sections.push({
      emoji: '⚠️', title: 'When to See a Doctor',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Do Not Delay a Doctor Visit If',
        tips: [
          'Cold lasting more than 10 days without any improvement',
          'Fever above 38.5°C (101.3°F) lasting more than 3 days',
          'Green or yellow thick nasal discharge (suggests bacterial sinusitis)',
          'Earache, facial pain or pressure around eyes (sinus infection developing)',
          'Breathing difficulty or chest pain alongside cold symptoms',
        ],
      }],
    })

    return { title, sections }
  }

  if (subKey === '5_502' || (catId === 5 && subId === 502)) {
    const sections = []

    if (has('co1')) sections.push({
      emoji: '🌿', title: 'Dry Cough Remedies',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Treating a Dry Cough at Home',
        tips: [
          'Honey is the most evidence-backed remedy for dry cough — 1 teaspoon before bed',
          'Inhale steam twice daily — moistens irritated airways and reduces cough reflex',
          'Stay well hydrated — dehydration worsens dry cough significantly',
          'Avoid air conditioning and fans blowing directly on you — dry air triggers dry cough',
          'Lozenges or hard candy increases saliva and soothes throat irritation temporarily',
        ],
      }],
    })

    if (has('co2')) sections.push({
      emoji: '🫁', title: 'Productive Cough Remedies',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Clearing Mucus Effectively',
        tips: [
          'Do NOT suppress a productive cough — the body is clearing infection. Let it out.',
          'Mucinex (Guaifenesin) is an expectorant that thins mucus — makes coughing it out easier',
          'Postural drainage: lean forward slightly when coughing to help mucus drain',
          'Salt water gargle with warm water — reduces throat inflammation and thins mucus',
          'Avoid antihistamines for productive cough — they thicken mucus and make it harder to clear',
        ],
      }],
    })

    if (has('co6','co7','co8')) sections.push({
      emoji: '🚨', title: 'Urgent — Possible Asthma or Infection',
      color: '#FFEBEE', border: '#EF9A9A',
      items: [{
        title: 'See a Doctor Today If',
        tips: [
          'Wheezing with breathlessness is a sign of asthma or bronchospasm — needs inhaler assessment',
          'Chest pain with cough could be pneumonia, pleurisy or other serious condition',
          'Do not delay if breathing is laboured — go to emergency if you cannot complete a sentence',
          'Cough with blood-stained sputum is always a red flag — TB, cancer, or bleeding must be ruled out',
          'A chest X-ray and sputum test will be needed — please do not postpone this',
        ],
      }],
    })

    if (has('co10')) sections.push({
      emoji: '⚠️', title: 'Chronic Cough Alert',
      color: '#FFF3E0', border: '#FFCC80',
      items: [{
        title: 'Cough Lasting More Than 3 Weeks',
        tips: [
          'A cough lasting 3+ weeks is defined as chronic and MUST be investigated medically',
          'Common causes: post-nasal drip, GERD, asthma, ACE inhibitor medication side effect, TB',
          'Get a chest X-ray, sputum test and spirometry (lung function test) done',
          'Mention all medications you are taking — ACE inhibitors (blood pressure drugs) cause chronic cough',
          'Never assume a chronic cough is "just a cold" — please see your doctor this week',
        ],
      }],
    })

    return { title, sections }
  }

  if (subKey === '5_503' || (catId === 5 && subId === 503)) {
    const sections = []

    sections.push({
      emoji: '🌡️', title: 'Fever Management',
      color: '#FFF3E0', border: '#FFB74D',
      items: [{
        title: 'Safe Home Fever Management',
        tips: [
          'Paracetamol (Dolo 650 / Crocin) every 6 hours for temperature above 38.5°C — safe and effective',
          'Drink 3–4 litres of fluid daily — coconut water, ORS, or plain water to prevent dehydration',
          'Cool compress on forehead with damp cloth — lowers surface temperature and provides comfort',
          'Rest completely — fever is the body fighting infection — don\'t push through it',
          'Wear light cotton clothing — do not over-bundle — heat needs to escape the body',
        ],
      }],
    })

    if (has('fv9')) sections.push({
      emoji: '🦟', title: 'Possible Malaria / Dengue',
      color: '#FFEBEE', border: '#EF9A9A',
      items: [{
        title: 'Fever Recurring Daily — Urgent Steps',
        tips: [
          'Fever recurring at the same time daily is a classic sign of malaria — see doctor TODAY',
          'Get a blood test: CBC (complete blood count) and malaria parasite test — same day',
          'Dengue fever: platelet count drops rapidly — daily monitoring required after day 3',
          'Do NOT take aspirin or ibuprofen for suspected dengue — dangerous platelet reduction',
          'Mosquito prevention immediately: use repellent and eliminate standing water in your home',
        ],
      }],
    })

    if (has('fv7')) sections.push({
      emoji: '🚨', title: 'EMERGENCY — See Doctor Immediately',
      color: '#FFEBEE', border: '#EF9A9A',
      items: [{
        title: 'These Symptoms with Fever = Emergency',
        tips: [
          'Severe headache + neck stiffness = possible meningitis — call 112 or go to ER now',
          'Confusion, drowsiness or seizure with fever = EMERGENCY',
          'Fever above 104°F (40°C) that does not come down with paracetamol — ER visit required',
          'Difficulty breathing or chest pain with fever — call ambulance immediately',
          'No urination for 8+ hours with fever = serious dehydration — IV fluids needed',
        ],
      }],
    })

    return { title, sections }
  }

  if (catId === 6) {
    const sections = []

    if (has('cr1','cr2','cr5')) sections.push({
      emoji: '🚨', title: 'EMERGENCY — Call 112 NOW',
      color: '#FFEBEE', border: '#EF4444',
      items: [{
        title: 'These Are Medical Emergencies',
        tips: [
          '🚨 CHEST PAIN: Call 112 immediately — chew one aspirin (325mg) if available while waiting',
          '🚨 STROKE SIGNS: F.A.S.T — Face drooping, Arm weakness, Speech slurred, Time to call 112',
          '🚨 SEIZURE: Do not restrain. Place on side. Clear area. Time the seizure. Call 112.',
          '🚨 UNCONSCIOUS: Check breathing. CPR if not breathing. Call 112 immediately.',
          'Do NOT drive yourself to hospital for these — call an ambulance',
        ],
      }],
    })

    sections.push({
      emoji: '🏥', title: 'Urgent Medical Steps',
      color: '#FFF3E0', border: '#FFCC80',
      items: [{
        title: 'What to Do Right Now',
        tips: [
          'Do NOT self-medicate or wait and see for critical health symptoms — time is critical',
          'Go to the nearest government or private hospital emergency department today',
          'Bring a list of all current medications and any previous medical reports',
          'If someone is with you, have them stay — you need support during emergency assessment',
          'Contact your specialist doctor immediately if you have a known critical condition',
        ],
      }],
    })

    sections.push({
      emoji: '📋', title: 'After Immediate Treatment',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Critical Health Long-Term Management',
        tips: [
          'Never miss follow-up appointments after a critical health event — the risk of second event peaks in weeks 1–4',
          'Take all prescribed medications exactly as directed — do not stop when you "feel better"',
          'Cardiac rehab, pulmonary rehab or physiotherapy after critical events significantly improves outcomes',
          'Lifestyle modifications are non-negotiable: stop smoking, reduce salt, manage weight',
          'Keep emergency numbers saved: 112 (ambulance), nearest hospital ER, your specialist\'s number',
        ],
      }],
    })

    return { title, sections }
  }

  if (catId === 7) {
    const sections = []

    if (has('mh8')) sections.push({
      emoji: '🆘', title: 'If You Are Having Thoughts of Self-Harm',
      color: '#FFEBEE', border: '#EF4444',
      items: [{
        title: 'You Are Not Alone — Please Read This',
        tips: [
          'Call iCall (free mental health helpline): 9152987821 — available Monday to Saturday',
          'Vandrevala Foundation 24/7 Helpline: 1860-2662-345 — free, confidential',
          'Tell one trusted person right now — a family member, friend, or teacher',
          'Go to your nearest hospital and tell the doctor you are having these thoughts',
          'These feelings are symptoms of an illness — they can be treated. Please seek help today.',
        ],
      }],
    })

    if (has('mh1','mh2')) sections.push({
      emoji: '💙', title: 'Managing Depression',
      color: '#E3F2FD', border: '#90CAF9',
      items: [{
        title: 'Evidence-Based Steps for Depression',
        tips: [
          'Behavioural activation: do ONE small enjoyable activity daily even when you don\'t feel like it',
          'Exercise is as effective as antidepressants for mild-moderate depression — start with 20-min walks',
          'Strict sleep routine: same bedtime and wake time daily — depression severely disrupts sleep',
          'Social connection: isolation worsens depression — contact one person every single day',
          'Cognitive Behavioural Therapy (CBT) with a psychologist is the most evidence-based treatment',
        ],
      }],
    })

    if (has('mh3')) sections.push({
      emoji: '🎭', title: 'Managing Mood Swings / Bipolar',
      color: '#FFF3E0', border: '#FFCC80',
      items: [{
        title: 'Bipolar Disorder Management',
        tips: [
          'Mood stabilisers (lithium, valproate, lamotrigine) are required — see a psychiatrist',
          'Sleep is the single most important stabiliser for bipolar — protect it fiercely',
          'Mood diary: track your daily mood (1–10 scale) to identify patterns and triggers',
          'Avoid alcohol completely — it triggers both manic and depressive episodes',
          'During a manic phase: reduce stimulation, cancel non-essential plans, contact your doctor',
        ],
      }],
    })

    if (has('mh4')) sections.push({
      emoji: '🔄', title: 'Managing OCD',
      color: '#F3E5F5', border: '#CE93D8',
      items: [{
        title: 'OCD Treatment Approach',
        tips: [
          'ERP (Exposure and Response Prevention) therapy with a trained CBT therapist is gold standard',
          'Do not give into compulsions — this provides temporary relief but strengthens OCD long term',
          'Gradually expose yourself to the feared thought without performing the ritual',
          'SSRIs (fluoxetine, sertraline) are effective for OCD — psychiatrist can prescribe',
          'OCD is a brain condition, not a character flaw or weakness — it is highly treatable',
        ],
      }],
    })

    if (has('mh5')) sections.push({
      emoji: '😰', title: 'Managing Panic & Anxiety',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Panic Attack and Anxiety Management',
        tips: [
          'During a panic attack: 5-4-3-2-1 grounding — name 5 things you see, 4 you touch, 3 you hear',
          'Slow diaphragmatic breathing: breathe IN for 5 seconds OUT for 7 seconds — calms nervous system',
          'Panic attacks cannot harm you physically — reminding yourself of this during one helps',
          'Reduce caffeine to zero — caffeine directly mimics and worsens anxiety symptoms',
          'CBT and SSRI medication are highly effective — please see a psychiatrist',
        ],
      }],
    })

    sections.push({
      emoji: '⚠️', title: 'Professional Help Is Essential',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Mental Health Requires Professional Treatment',
        tips: [
          'Mental health conditions are medical conditions — they require proper assessment and treatment',
          'A psychiatrist can prescribe medication. A psychologist provides therapy. You may need both.',
          'Most mental health conditions have very good treatment outcomes with proper care',
          'Therapy is not "talking to someone and nothing changing" — structured CBT creates real change',
          'NIMHANS (Bangalore), AIIMS and all major government hospitals have free psychiatric services',
        ],
      }],
    })

    return { title, sections }
  }

  return {
    title,
    sections: [{
      emoji: '💚', title: 'General Wellness',
      color: '#E8F5E9', border: '#A5D6A7',
      items: [{
        title: 'Foundation of Good Health',
        tips: [
          'Eat a balanced diet with vegetables, whole grains and lean protein at every meal',
          'Exercise at least 150 minutes per week at moderate intensity',
          'Prioritise 7–8 hours of quality sleep every night — recovery happens during sleep',
          'Stay hydrated: 2–3 litres of water daily depending on activity and climate',
          'Annual health check-up with blood tests — prevention is better than treatment',
        ],
      }],
    }, {
      emoji: '⚠️', title: 'When to See a Doctor',
      color: '#FFF8E1', border: '#FFD54F',
      items: [{
        title: 'Do Not Delay Medical Attention If',
        tips: [
          'Symptoms last more than 2 weeks without improvement',
          'You experience chest pain, breathlessness or severe headache',
          'You are losing weight without trying',
          'You have significant anxiety or mood changes affecting daily life',
          'Book an appointment with your doctor and describe your full symptom history',
        ],
      }],
    }],
  }
}
export default function SolutionScreen() {
  const nav = useNavigate()
  const { userData } = useGlobalStore()
  const solution = useMemo(() => buildSolution(userData), [userData])

  return (
      <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh',
        background:'#F5F7FF', fontFamily:"'Plus Jakarta Sans','Segoe UI',sans-serif" }}>
        <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .sec { animation: fadeUp 0.4s ease both; }
      `}</style>

        <AppBar title="Your Recommendations" />

        <div style={{ flex:1, overflowY:'auto' }}>
          {/* Hero */}
          <div style={{ margin:'14px 16px 0', borderRadius:20,
            background:'linear-gradient(135deg,#0A1628 0%,#1565C0 60%,#0097A7 100%)',
            padding:'18px 18px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute',top:-30,right:-30,width:110,height:110,borderRadius:'50%',
              background:'rgba(255,255,255,0.06)',pointerEvents:'none' }} />
            <div style={{ display:'flex', gap:14, alignItems:'center', position:'relative', zIndex:1 }}>
              <div style={{ width:50, height:50, borderRadius:13, flexShrink:0,
                background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="material-icons" style={{ color:'#fff', fontSize:24 }}>health_and_safety</span>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ color:'#fff', fontWeight:800, fontSize:14, margin:'0 0 3px', lineHeight:1.3 }}>
                  {solution.title}
                </p>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, margin:0 }}>
                  {solution.sections.length} personalised recommendations · based on your answers
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div style={{ padding:'12px 16px 16px', display:'flex', flexDirection:'column', gap:12 }}>
            {solution.sections.map((sec, i) => (
                <div key={i} className="sec" style={{ animationDelay:`${i*0.06}s`,
                  background:'#fff', borderRadius:18, overflow:'hidden',
                  boxShadow:'0 3px 14px rgba(10,22,40,0.07)' }}>

                  {/* Section header */}
                  <div style={{ padding:'13px 16px', background: sec.color || '#F0F4FF',
                    borderBottom:`2px solid ${sec.border || '#E3EEFF'}`,
                    display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:18 }}>{sec.emoji}</span>
                    <p style={{ fontSize:14, fontWeight:800, color:'#0A1628', margin:0, flex:1 }}>
                      {sec.title}
                    </p>
                    <div style={{ width:22, height:22, borderRadius:'50%',
                      background:'rgba(255,255,255,0.8)', border:`1px solid ${sec.border||'#ccc'}`,
                      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span style={{ fontSize:10, fontWeight:800, color:'#374151' }}>{i+1}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ padding:'12px 16px 14px', display:'flex', flexDirection:'column', gap:12 }}>
                    {sec.items.map((item, j) => (
                        <div key={j}>
                          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
                      <span className="material-icons" style={{ fontSize:15, color:'#2979FF' }}>
                        tips_and_updates
                      </span>
                            <p style={{ fontSize:13, fontWeight:700, color:'#374151', margin:0 }}>
                              {item.title}
                            </p>
                          </div>
                          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                            {item.tips.map((tip, k) => (
                                <div key={k} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                                  <div style={{ width:6, height:6, borderRadius:'50%', flexShrink:0,
                                    background: tip.startsWith('🚨') ? '#EF4444' : '#2979FF',
                                    marginTop:7 }} />
                                  <p style={{ fontSize:13, margin:0, lineHeight:1.6,
                                    fontWeight: tip.startsWith('🚨') ? 700 : 400,
                                    color: tip.startsWith('🚨') ? '#DC2626' : '#4B5563' }}>
                                    {tip}
                                  </p>
                                </div>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ background:'#fff', padding:'14px 20px 28px',
          boxShadow:'0 -4px 20px rgba(10,22,40,0.08)',
          display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={() => nav('/appointment')} style={{
            padding:'15px', borderRadius:14, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg,#2979FF,#0097A7)',
            color:'#fff', fontSize:15, fontWeight:800,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:'0 5px 20px rgba(41,121,255,0.35)',
          }}>
            <span className="material-icons" style={{ fontSize:18 }}>calendar_today</span>
            Book an Appointment
          </button>
          <button onClick={() => nav('/categories',{replace:true})} style={{
            padding:'13px', borderRadius:14, background:'transparent',
            border:'1.5px solid #E5E9F5', cursor:'pointer',
            color:'#6B7280', fontSize:14, fontWeight:600,
          }}>← Back to Home</button>
        </div>
      </div>
  )
}