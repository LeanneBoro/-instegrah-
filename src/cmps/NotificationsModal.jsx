export function NotificationsModal({ expandedSection, setExpandedSection }) {

    return <section className={expandedSection === 'notifications' ? 'notifications-modal active' : 'notifications-modal'} >


        <section className="notifications-nav">

            <img className="back-btn" src="src\assets\svgs\Close-Arrow.svg" alt="" onClick={() => setExpandedSection(null)} />

            <div>Notifications</div>

        </section>

        <section className="recent">
            <div className="title">Notifications</div>
            <h1>This week</h1>

            Here be this week's Notification list
        </section>

        <section className="earlier">
            <h1>Earlier</h1>

            Here be Earlier Notification list
        </section>



    </section>
}