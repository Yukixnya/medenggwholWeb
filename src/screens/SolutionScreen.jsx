import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../store/globalStore'

function buildSolution(userData) {
    const ids = new Set(userData?.allSelectedIds || [])

    if (ids.size === 0) {
        return {
            title: 'No Data Found',
            sections: [
                { title: 'Info', content: 'Please complete the assessment first.' }
            ]
        }
    }

    const hasAny = (...arr) => arr.some(id => ids.has(id))

    // 🚨 EMERGENCY
    if (hasAny('emg1','emg2','emg3','emg4','emg5')) {
        return {
            title: 'Emergency Detected 🚨',
            sections: [
                { title: 'Immediate Action', content: 'Call 112 or visit nearest hospital immediately.' },
                { title: 'Important', content: 'Do not delay. These symptoms can be life-threatening.' }
            ]
        }
    }

    // 🔴 FEVER
    if (ids.has('fev_severe')) {
        return {
            title: 'Severe Fever',
            sections: [
                { title: 'Condition', content: 'High fever above 102°F detected.' },
                { title: 'Action', content: 'Take paracetamol and consult doctor urgently.' },
                { title: 'Warning', content: 'Seek help if symptoms worsen.' }
            ]
        }
    }

    if (ids.has('fev_moderate')) {
        return {
            title: 'Moderate Fever',
            sections: [
                { title: 'Care', content: 'Rest, fluids, light diet, monitor temperature.' }
            ]
        }
    }

    if (ids.has('fev_mild')) {
        return {
            title: 'Mild Fever',
            sections: [
                { title: 'Care', content: 'Hydration, rest, avoid cold foods.' }
            ]
        }
    }

    if (hasAny('str1','str2','str3','str4','str5')) {
        return {
            title: 'Stress Detected',
            sections: [
                { title: 'State', content: 'You may be mentally overloaded.' },
                { title: 'Action', content: 'Try meditation, sleep well, reduce workload.' }
            ]
        }
    }

    if (hasAny('rel1','rel2','rel3','rel4','rel5')) {
        return {
            title: 'Relationship Issue',
            sections: [
                { title: 'Insight', content: 'Communication or emotional gap detected.' },
                { title: 'Advice', content: 'Talk calmly and express clearly.' }
            ]
        }
    }

    if (hasAny('p_irreg_yes','p_weight','p_acne','p_hairloss')) {
        return {
            title: 'Possible PCOS',
            sections: [
                { title: 'Condition', content: 'Hormonal imbalance symptoms detected.' },
                { title: 'Action', content: 'Consult doctor, improve diet and exercise.' }
            ]
        }
    }

    return {
        title: 'General Health Advice',
        sections: [
            { title: 'Care', content: 'Maintain healthy lifestyle and monitor symptoms.' }
        ]
    }
}

export default function SolutionScreen() {
    const nav = useNavigate()
    const { userData } = useGlobalStore()

    const solution = useMemo(() => buildSolution(userData), [userData])

    return (
        <div style={{
            minHeight: '100vh',
            background: '#F5F7FF',
            padding: 20,
            fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif"
        }}>

            {/* TITLE */}
            <h2 style={{
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 16,
                color: '#0A1628'
            }}>
                {solution?.title || 'Loading...'}
            </h2>

            {/* SECTIONS */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
            }}>
                {(solution?.sections || []).map((sec, i) => (
                    <div
                        key={i}
                        style={{
                            background: '#fff',
                            borderRadius: 16,
                            padding: 18,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }}
                    >
                        <h3 style={{
                            fontSize: 16,
                            fontWeight: 700,
                            marginBottom: 8,
                            color: '#0A1628'
                        }}>
                            {sec.title}
                        </h3>

                        <p style={{
                            fontSize: 14,
                            color: '#4B5563',
                            lineHeight: 1.6
                        }}>
                            {sec.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* BUTTONS */}
            <div style={{
                marginTop: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}>
                <button
                    onClick={() => nav('/appointment')}
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        background: '#1976D2',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 700
                    }}
                >
                    Book Appointment
                </button>

                <button
                    onClick={() => nav('/categories')}
                    style={{
                        padding: 14,
                        borderRadius: 12,
                        background: '#fff',
                        border: '2px solid #E5E7EB',
                        fontWeight: 600
                    }}
                >
                    Back to Home
                </button>
            </div>

        </div>
    )
}