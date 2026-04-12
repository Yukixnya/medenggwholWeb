import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'

function buildSolution(userData) {
    const ids = new Set(userData?.allSelectedIds || [])
    const hasAny = (...arr) => arr.some(id => ids.has(id))
    const catId = Number(userData?.selectedCategoryId)

    if (ids.size === 0 && !catId) {
        return {
            title: 'No Data Found',
            color: '#64748B',
            sections: [
                { title: 'Information', content: 'Please complete an assessment first.' }
            ]
        }
    }

    // FEVER & INFECTIONS
    if (catId === 1 || hasAny('f_symp_1', 'f_symp_2', 'f_symp_3', 'f_body_head', 'f_body_weak', 'f_body_nose', 'f_body_throat', 'f_body_cough', 'f_body_breath', 'f_body_nausea', 'f_body_vomiting')) {
        let isEmergency = ids.has('f_body_breath'); // Difficulty breathing

        let symptomsDetected = [];
        if (ids.has('f_body_head')) symptomsDetected.push('Headache');
        if (ids.has('f_body_weak')) symptomsDetected.push('Weakness');
        if (ids.has('f_body_nose')) symptomsDetected.push('Congestion');
        if (ids.has('f_body_throat')) symptomsDetected.push('Sore Throat');
        if (ids.has('f_body_cough')) symptomsDetected.push('Cough');
        if (hasAny('f_body_nausea', 'f_body_vomiting', 'f_body_abdominal_pain')) symptomsDetected.push('Digestive distress');

        let causes = [];
        if (ids.has('f_food_yes')) causes.push('Outside food');
        if (ids.has('f_icecream_yes')) causes.push('Cold intake');
        if (ids.has('f_travel_yes')) causes.push('Climate change/Travel');
        if (ids.has('f_exercise_yes')) causes.push('Physical overexertion');

        return {
            title: isEmergency ? 'Urgent Attention Required 🚨' : 'Fever & Infection Assessment',
            color: isEmergency ? '#EF4444' : '#F59E0B',
            icon: isEmergency ? 'emergency' : 'thermostat',
            sections: [
                {
                    title: 'Symptom Profile',
                    content: symptomsDetected.length > 0 ? `Detected: ${symptomsDetected.join(' • ')}.` : 'General fever symptoms reported.'
                },
                {
                    title: 'Analysis',
                    content: isEmergency ? 'Severe respiratory distress detected. Please seek medical help immediately.' : 'Your symptoms suggest an acute infection, likely viral or related to recent lifestyle/exposure factors.'
                },
                {
                    title: 'Possible Triggers',
                    content: causes.length > 0 ? causes.join(' • ') : 'Seasonal exposure or viral transmission.'
                },
                {
                    title: 'Recommendation',
                    content: 'Maintain bed rest, stay hydrated with electrolyte fluids, and monitor temperature regularly. Avoid cold/fried foods. Consult a doctor if fever exceeds 101°F.'
                }
            ]
        }
    }

    // PCOS & HORMONAL HEALTH
    if (catId === 2 || hasAny('p_irreg_yes', 'p_mood_yes', 'p_hair_yes', 'p_hl', 'p_acne', 'p_gain_yes', 'p_dark_yes')) {
        let symptomsDetected = [];
        if (ids.has('p_irreg_yes')) symptomsDetected.push('Irregular periods');
        if (ids.has('p_mood_yes')) symptomsDetected.push('Mood swings/Fatigue');
        if (ids.has('p_hair_yes')) symptomsDetected.push('Excess body hair');
        if (ids.has('p_hl')) symptomsDetected.push('Hair thinning');
        if (ids.has('p_acne')) symptomsDetected.push('Acne/Skin issues');
        if (ids.has('p_gain_yes')) symptomsDetected.push('Weight gain');
        if (ids.has('p_dark_yes')) symptomsDetected.push('Dark skin patches');

        let score = symptomsDetected.length;

        return {
            title: score >= 3 ? 'High Probability of PCOS' : 'Hormonal Assessment',
            color: '#EC4899',
            icon: 'water_drop',
            sections: [
                {
                    title: 'Symptom Match',
                    content: symptomsDetected.length > 0 ? `Identified Indicators: ${symptomsDetected.join(' • ')}.` : 'General hormonal concerns reported.'
                },
                {
                    title: 'Clinical Analysis',
                    content: score >= 3 ? 'You exhibit multiple primary markers of Polycystic Ovary Syndrome (PCOS). This requires clinical confirmation through blood work and imaging.' : 'You have a few indicators that may suggest mild hormonal imbalance or the early stages of a metabolic shift.'
                },
                {
                    title: 'Recommended Tests',
                    content: 'Standard diagnostic protocol includes a Pelvic Ultrasound (for cystic ovaries) and a hormonal blood panel (LH, FSH, Testosterone, and Fasting Insulin).'
                },
                {
                    title: 'Lifestyle Management',
                    content: 'Focus on a low-glycemic diet to manage insulin resistance. Regular strength training and stress management are key to balancing hormones naturally.'
                }
            ]
        }
    }

    // THYROID & LIFESTYLE (Category 3)
    if (catId === 3 || hasAny('t_fried_yes', 't_sugar_yes', 't_nv_yes', 't_stress_yes', 't_sit_yes', 't_d_th', 't_d_bp', 't_d_db')) {
        let diseases = [];
        if (ids.has('t_d_th')) diseases.push('Thyroid');
        if (ids.has('t_d_bp')) diseases.push('Blood Pressure');
        if (ids.has('t_d_db')) diseases.push('Diabetes');

        let riskFactors = [];
        if (ids.has('t_fried_yes')) riskFactors.push('High fried food intake');
        if (ids.has('t_sugar_yes')) riskFactors.push('Frequent sugary foods');
        if (ids.has('t_sit_yes')) riskFactors.push('Sedentary lifestyle');
        if (ids.has('t_stress_yes')) riskFactors.push('Elevated stress levels');

        let mealsCount = ['t_m_bf', 't_m_lu', 't_m_sn', 't_m_dn'].filter(m => ids.has(m)).length;

        return {
            title: 'Metabolic & Lifestyle Assessment',
            color: '#3B82F6',
            icon: 'monitor_weight',
            sections: [
                {
                    title: 'Current Conditions',
                    content: diseases.length > 0 ? `Active management required for: ${diseases.join(' • ')}.` : 'Focused on metabolic optimization and prevention.'
                },
                {
                    title: 'Nutrition Analysis',
                    content: mealsCount < 3 ? 'Irregular meal patterns detected. Consistent nutrition is key for thyroid and metabolic health.' : 'Standard meal frequency reported. Watch for high-calorie intake from fried or sugary items.'
                },
                {
                    title: 'Identified Risk Factors',
                    content: riskFactors.length > 0 ? riskFactors.join(' • ') : 'No high-risk lifestyle factors identified at this time.'
                },
                {
                    title: 'Actionable Advice',
                    content: 'Maintain a consistent meal schedule. Replace refined sugars with whole grains and ensure at least 30 minutes of physical activity daily to combat sedentary habits.'
                }
            ]
        }
    }

    return {
        title: 'General Health Assessment',
        color: '#10B981',
        icon: 'health_and_safety',
        sections: [
            { title: 'Status', content: 'No immediate severe risks detected based on your input.' },
            { title: 'Advice', content: 'Maintain a healthy lifestyle, stay hydrated, and consult a doctor if any symptoms persist.' }
        ]
    }
}

export default function SolutionScreen() {
    const nav = useNavigate()
    const { userData } = useGlobalStore()

    const solution = useMemo(() => buildSolution(userData), [userData])

    // Convert hex color to rgba for soft backgrounds
    const hexToRgba = (hex, alpha) => {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div style={{
            height: '100dvh', // Fixed viewport height to enable internal scrolling
            background: 'linear-gradient(135deg, #F8FAFC, #E2E8F0)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
            alignItems: 'center'
        }}>
            <style>{`
                .ss-hdr { padding: 40px 24px 24px; position: relative; z-index: 1; width: 100%; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .ss-content { flex: 1; padding: 0 24px 40px; position: relative; z-index: 1; width: 100%; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
                .ss-grid { display: flex; flex-direction: column; gap: 16px; width: 100%; }
                .ss-actions { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 12px; width: 100%; }
                
                @media(min-width: 768px) {
                    .ss-hdr { padding: 60px 40px 40px; max-width: 1000px; }
                    .ss-content { padding: 0 40px 60px; max-width: 1000px; }
                    .ss-title { font-size: 42px !important; }
                    .ss-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
                    .ss-actions { flex-direction: row; justify-content: center; margin-top: 40px; }
                    .ss-actions button { flex: 1; }
                }
            `}</style>

            {/* Background decorative blobs */}
            <div style={{
                position: 'absolute', top: -100, right: -50,
                width: 300, height: 300, borderRadius: '50%',
                background: hexToRgba(solution.color, 0.15),
                filter: 'blur(60px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: -50, left: -50,
                width: 250, height: 250, borderRadius: '50%',
                background: hexToRgba(solution.color, 0.1),
                filter: 'blur(50px)', pointerEvents: 'none'
            }} />

            {/* HEADER */}
            <div className="ss-hdr">
                <div style={{
                    width: 72, height: 72, borderRadius: 24,
                    background: hexToRgba(solution.color, 0.15),
                    color: solution.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    boxShadow: `0 8px 32px ${hexToRgba(solution.color, 0.2)}`
                }}>
                    <span className="material-icons" style={{ fontSize: 36 }}>
                        {solution.icon || 'analytics'}
                    </span>
                </div>

                <h1 className="ss-title" style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#0F172A',
                    margin: '0 0 12px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.5px'
                }}>
                    {solution.title}
                </h1>
                <p style={{ fontSize: 15, color: '#64748B', maxWidth: '80%', margin: 0, fontWeight: 500 }}>
                    Based on your personalized questionnaire assessment.
                </p>
            </div>

            {/* CONTENT CARDS */}
            <div className="ss-content">
                <div className="ss-grid">
                    {solution.sections.map((sec, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                borderRadius: 24,
                                padding: '24px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                                transform: 'translateZ(0)' // Hardware acceleration
                            }}
                        >
                            <h3 style={{
                                fontSize: 14,
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: solution.color,
                                margin: '0 0 10px'
                            }}>
                                {sec.title}
                            </h3>
                            <p style={{
                                fontSize: 16,
                                color: '#334155',
                                lineHeight: 1.6,
                                margin: 0,
                                fontWeight: 600
                            }}>
                                {sec.content}
                            </p>
                        </div>
                    ))}

                </div>

                {/* CALL TO ACTION BUTTONS */}
                <div className="ss-actions">
                    <button
                        onClick={() => nav('/appointment')}
                        style={{
                            padding: '18px',
                            borderRadius: '20px',
                            background: `linear-gradient(135deg, ${solution.color}, ${hexToRgba(solution.color, 0.8)})`,
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 800,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            boxShadow: `0 12px 32px ${hexToRgba(solution.color, 0.3)}`,
                            transition: 'all 0.2s ease',
                            width: '100%'
                        }}
                    >
                        <span className="material-icons" style={{ fontSize: 20 }}>calendar_month</span>
                        Consult a Specialist
                    </button>

                    <button
                        onClick={() => nav('/categories')}
                        style={{
                            padding: '18px',
                            borderRadius: '20px',
                            background: 'transparent',
                            color: '#64748B',
                            fontSize: 16,
                            fontWeight: 700,
                            border: '2px solid rgba(148, 163, 184, 0.3)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            width: '100%'
                        }}
                    >
                        Finish Assessment
                    </button>
                </div>
            </div>

        </div>
    )
}