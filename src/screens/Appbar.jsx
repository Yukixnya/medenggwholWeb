import { useNavigate } from 'react-router-dom'

export default function AppBar({ title, showBack = true, onBack, rightContent }) {
    const nav = useNavigate()

    function handleBack() {
        if (onBack) onBack()
        else nav(-1)
    }

    return (
        <>
            <style>{`
                .appbar-wrap {
                    width: 100%;
                    background: linear-gradient(135deg, #0A1628 0%, #1565C0 60%, #0097A7 100%);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: 0 2px 16px rgba(10,22,40,0.25);
                }
                .appbar-inner {
                    max-width: 100%;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    padding: 0 16px;
                    height: 60px;
                    box-sizing: border-box;
                    gap: 12px;
                }
                @media (min-width: 900px) {
                    .appbar-inner { max-width: 960px; }
                }
                .back-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.12);
                    border: 1.5px solid rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: background 0.15s ease, transform 0.12s ease;
                    padding: 0;
                    outline: none;
                }
                .back-btn:hover {
                    background: rgba(255,255,255,0.22);
                }
                .back-btn:active {
                    transform: scale(0.92);
                }
                .appbar-title {
                    flex: 1;
                    font-size: 17px;
                    font-weight: 800;
                    color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    letter-spacing: -0.2px;
                    font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
                }
                .appbar-spacer {
                    width: 40px;
                    flex-shrink: 0;
                }
            `}</style>

            <div className="appbar-wrap">
                <div className="appbar-inner">
                    {showBack ? (
                        <button className="back-btn" onClick={handleBack} aria-label="Go back">
                            {/* Inline SVG chevron — no font dependency, always sharp */}
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                    ) : (
                        <div style={{ width: 40 }} />
                    )}

                    <span className="appbar-title">{title}</span>

                    {rightContent
                        ? <div style={{ flexShrink: 0 }}>{rightContent}</div>
                        : <div className="appbar-spacer" />
                    }
                </div>
            </div>
        </>
    )
}