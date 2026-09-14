const localeMap = {
    zh: "zh-Hans",
    fr: "fr",
    de: "de",
    es: "es",
    pt: "pt-BR",
    ja: "ja",
    ko: "ko",
    ru: "ru",
    en: "en"
};

const copy = {
    en: {
        navPrivacy: "Privacy",
        navSupport: "Support",
        homeTagline: "Record clearly. Keep it local.",
        homeSummary: "Screen, camera, and audio recording built for your Mac, with no accounts, analytics, or cloud upload.",
        privacyAction: "Read the privacy policy",
        supportAction: "Get support",
        localTitle: "Local by design",
        localBody: "Recordings and preferences stay on your Mac.",
        controlTitle: "You choose what to capture",
        controlBody: "Screen, window, region, camera, microphone, and system audio remain under your control.",
        recoveryTitle: "Recovery built in",
        recoveryBody: "Interrupted recordings can be recovered from playable local fragments.",
        privacyTitle: "Privacy Policy",
        privacySummary: "Your recordings are created on your Mac. FTRecord does not collect, transmit, sell, or share personal data.",
        noCollectionTitle: "No collection",
        noCollectionBody: "No recording or usage data is sent to us.",
        localProcessingTitle: "Local processing",
        localProcessingBody: "Screen, camera, microphone, and system audio are processed on your Mac.",
        yourControlTitle: "Your control",
        yourControlBody: "You start every recording, choose its location, and decide when to share or delete it.",
        effectiveDate: "Effective September 14, 2026",
        supportTitle: "Support",
        supportSummary: "Setup guidance for recording, permissions, local files, and recovery.",
        supportHeading: "FTRecord Support",
        requirements: "Requires macOS 15 or later on Apple silicon",
        contactAction: "Contact on GitHub",
        privacySections: [
            ["Overview and recording data", "FTRecord records and processes media entirely on your Mac. Only after you explicitly start a recording may it process the screen, selected windows or regions, camera video, microphone audio, and system audio according to your settings. The developer does not collect, transmit, sell, or share this content or other personal data."],
            ["Permissions", "FTRecord requests macOS permission only when a feature needs screen recording, system audio, camera, or microphone access. You can review or revoke these permissions in System Settings. Features requiring a revoked permission will stop working until access is restored."],
            ["Files and recovery", "Recordings are saved locally, by default in Movies/FTRecord. A security-scoped bookmark may be stored on your Mac if you choose another folder. During recording, temporary recovery information may be stored in Application Support and is removed after successful completion, recovery, or discard."],
            ["Sharing", "FTRecord opens the macOS share picker only when you choose Share. Any transfer is performed by the service you select and is governed by that service’s privacy terms. FTRecord does not upload recordings by itself."],
            ["Preferences, accounts, and analytics", "Recording settings, shortcut choices, first-run status, and login-item preference are stored locally. FTRecord has no accounts, advertising, analytics, tracking, cloud synchronization, or third-party data-collection SDKs."],
            ["Retention, deletion, and contact", "Because no personal data is collected on a developer server, there is no server-side personal data to retain or delete. You control recordings through FTRecord or Finder. Removing FTRecord and its associated app data removes locally stored preferences and recovery information. If these practices change, this policy and the App Store privacy information will be updated before release. For questions, use the FTRecord support page or contact the developer on GitHub."]
        ],
        supportSections: [
            ["Start a recording", "Open FTRecord, choose Screen, Camera, or Audio in Settings, and select your video and audio options. Click Start Recording. For screen mode, drag to select a region, adjust the preparation controls if needed, then click the red record button."],
            ["Permissions", "FTRecord may need Screen & System Audio, Camera, and Microphone permissions. Open FTRecord Settings > Permissions to see their status and jump to macOS System Settings. After changing screen recording access, quit and reopen FTRecord."],
            ["Pause and stop", "Use the floating control bar, the menu bar icon, or your selected global shortcuts to pause, resume, or stop. A red border and visible control bar indicate an active screen recording."],
            ["Recordings, storage, and recovery", "Recordings are saved to Movies/FTRecord by default. Choose another folder in Settings > Recording. The media library lets you preview, rename, reveal, share, trim, or delete recordings. If a session is interrupted, open Recovery in the sidebar to recover playable fragments or discard them."],
            ["Contact", "For support, bug reports, or feedback, contact the developer through GitHub. Include your macOS and FTRecord versions, recording mode, permission status, and steps to reproduce. Do not include recordings, passwords, or sensitive information."]
        ]
    },
    "zh-Hans": {
        navPrivacy: "隐私政策", navSupport: "获取支持",
        homeTagline: "清晰录制，留在本机。",
        homeSummary: "为 Mac 打造的屏幕、摄像头与音频录制工具，无需账号，不含分析统计，也不会上传到云端。",
        privacyAction: "阅读隐私政策", supportAction: "获取支持",
        localTitle: "本地优先", localBody: "录制文件和偏好设置保留在你的 Mac 上。",
        controlTitle: "由你决定录制内容", controlBody: "屏幕、窗口、区域、摄像头、麦克风和系统音频始终由你控制。",
        recoveryTitle: "内置录制恢复", recoveryBody: "异常中断后，可以从本机可播放片段恢复录制。",
        privacyTitle: "隐私政策",
        privacySummary: "录制内容在你的 Mac 上生成。FTRecord 不收集、传输、出售或共享个人数据。",
        noCollectionTitle: "不收集数据", noCollectionBody: "不会向我们发送录制内容或使用数据。",
        localProcessingTitle: "本机处理", localProcessingBody: "屏幕、摄像头、麦克风和系统音频均在你的 Mac 上处理。",
        yourControlTitle: "由你控制", yourControlBody: "每次录制均由你启动，保存位置、分享和删除也由你决定。",
        effectiveDate: "生效日期：2026 年 9 月 14 日",
        supportTitle: "获取支持", supportSummary: "查看录制、权限、本地文件和恢复功能的使用说明。",
        supportHeading: "FTRecord 支持", requirements: "需要搭载 Apple 芯片的 Mac，运行 macOS 15 或更高版本",
        contactAction: "通过 GitHub 联系",
        privacySections: [
            ["概述与录制数据", "FTRecord 完全在你的 Mac 上录制和处理媒体。只有在你明确开始录制后，应用才会根据设置处理屏幕、所选窗口或区域、摄像头画面、麦克风音频和系统音频。开发者不会收集、传输、出售或共享这些内容及其他个人数据。"],
            ["权限", "FTRecord 仅在功能需要时请求 macOS 的屏幕录制、系统音频、摄像头或麦克风权限。你可以在系统设置中查看或撤销权限。权限被撤销后，相关功能会停止工作，直至重新授权。"],
            ["文件与恢复", "录制文件保存在本机，默认位置为“影片/FTRecord”。如果你选择其他文件夹，应用可能在 Mac 上保存安全作用域书签。录制期间，Application Support 中可能保存临时恢复信息，并在录制成功完成、恢复或丢弃后删除。"],
            ["分享", "只有在你选择“分享”时，FTRecord 才会打开 macOS 分享面板。传输由你选择的服务完成，并受该服务的隐私条款约束。FTRecord 不会自行上传录制文件。"],
            ["偏好、账号与分析", "录制设置、快捷键选择、首次运行状态和登录项偏好保存在本机。FTRecord 不需要账号，不含广告、分析、跟踪、云同步或收集数据的第三方 SDK。"],
            ["保留、删除与联系", "开发者服务器不收集个人数据，因此没有需要保留或删除的服务器端个人数据。你可以通过 FTRecord 或 Finder 管理录制文件。删除 FTRecord 及其关联应用数据可清除本机偏好和恢复信息。如果数据处理方式改变，我们会在发布前更新本政策和 App Store 隐私信息。如有问题，请使用 FTRecord 支持页面或通过 GitHub 联系开发者。"]
        ],
        supportSections: [
            ["开始录制", "打开 FTRecord，在设置中选择屏幕、摄像头或音频模式，并配置视频与声音选项。点击“开始录制”。屏幕模式下，拖动选择区域，按需调整准备工具条，然后点击红色录制按钮。"],
            ["权限", "FTRecord 可能需要屏幕与系统音频、摄像头和麦克风权限。打开“FTRecord 设置 > 权限”可以查看状态并跳转系统设置。修改屏幕录制权限后，请退出并重新打开 FTRecord。"],
            ["暂停与停止", "可使用悬浮控制条、菜单栏图标或选定的全局快捷键暂停、继续或停止。红色边框和持续显示的控制条表示屏幕录制正在进行。"],
            ["录制文件、存储与恢复", "录制默认保存在“影片/FTRecord”。可在“设置 > 录制”中选择其他文件夹。媒体库支持预览、重命名、在 Finder 中显示、分享、裁剪或删除。录制异常中断时，在侧边栏打开“待恢复”，恢复可播放片段或将其丢弃。"],
            ["联系开发者", "如需支持、报告问题或提出建议，请通过 GitHub 联系开发者。请提供 macOS 和 FTRecord 版本、录制模式、权限状态及复现步骤，不要附带录制内容、密码或敏感信息。"]
        ]
    },
    fr: {
        navPrivacy: "Confidentialité", navSupport: "Assistance",
        homeTagline: "Enregistrez clairement. Gardez tout en local.",
        homeSummary: "Enregistrement de l’écran, de la caméra et du son conçu pour votre Mac, sans compte, analyse ni envoi dans le cloud.",
        privacyAction: "Lire la politique de confidentialité", supportAction: "Obtenir de l’aide",
        localTitle: "Local par conception", localBody: "Vos enregistrements et préférences restent sur votre Mac.",
        controlTitle: "Vous choisissez quoi capturer", controlBody: "Écran, fenêtre, zone, caméra, microphone et audio système restent sous votre contrôle.",
        recoveryTitle: "Récupération intégrée", recoveryBody: "Les enregistrements interrompus peuvent être récupérés depuis les fragments lisibles locaux.",
        privacyTitle: "Politique de confidentialité",
        privacySummary: "Vos enregistrements sont créés sur votre Mac. FTRecord ne collecte, ne transmet, ne vend ni ne partage de données personnelles.",
        noCollectionTitle: "Aucune collecte", noCollectionBody: "Aucun enregistrement ni donnée d’utilisation ne nous est envoyé.",
        localProcessingTitle: "Traitement local", localProcessingBody: "L’écran, la caméra, le microphone et l’audio système sont traités sur votre Mac.",
        yourControlTitle: "Sous votre contrôle", yourControlBody: "Vous lancez chaque enregistrement, choisissez son emplacement et décidez de le partager ou de le supprimer.",
        effectiveDate: "En vigueur le 14 septembre 2026",
        supportTitle: "Assistance", supportSummary: "Aide pour l’enregistrement, les autorisations, les fichiers locaux et la récupération.",
        supportHeading: "Assistance FTRecord", requirements: "Nécessite macOS 15 ou ultérieur sur un Mac avec puce Apple",
        contactAction: "Contacter sur GitHub",
        privacySections: [
            ["Présentation et données d’enregistrement", "FTRecord enregistre et traite les médias entièrement sur votre Mac. Ce n’est qu’après votre action explicite qu’il traite, selon vos réglages, l’écran, les fenêtres ou zones choisies, la caméra, le microphone et l’audio système. Le développeur ne collecte, ne transmet, ne vend ni ne partage ces contenus ou d’autres données personnelles."],
            ["Autorisations", "FTRecord demande une autorisation macOS uniquement lorsqu’une fonction nécessite l’écran, l’audio système, la caméra ou le microphone. Vous pouvez consulter ou révoquer ces autorisations dans Réglages Système. Les fonctions concernées restent indisponibles jusqu’au rétablissement de l’accès."],
            ["Fichiers et récupération", "Les enregistrements sont stockés localement, par défaut dans Films/FTRecord. Si vous choisissez un autre dossier, un signet à portée de sécurité peut être conservé sur votre Mac. Des informations temporaires de récupération peuvent être enregistrées dans Application Support, puis supprimées après la fin, la récupération ou l’abandon."],
            ["Partage", "FTRecord ouvre le menu de partage macOS uniquement à votre demande. Le transfert est réalisé par le service choisi et soumis à ses propres règles de confidentialité. FTRecord ne téléverse aucun enregistrement de lui-même."],
            ["Préférences, comptes et analyse", "Les réglages d’enregistrement, raccourcis, état de première utilisation et préférence de lancement sont stockés localement. FTRecord ne comporte aucun compte, publicité, analyse, suivi, synchronisation cloud ou SDK tiers collectant des données."],
            ["Conservation, suppression et contact", "Aucune donnée personnelle n’étant collectée sur un serveur du développeur, aucune donnée distante n’est à conserver ou supprimer. Vous gérez vos fichiers dans FTRecord ou le Finder. La suppression de l’app et de ses données efface les préférences et informations de récupération locales. Toute évolution sera publiée ici et dans les informations de confidentialité de l’App Store. Pour toute question, utilisez la page d’assistance ou GitHub."]
        ],
        supportSections: [
            ["Démarrer un enregistrement", "Ouvrez FTRecord, choisissez Écran, Caméra ou Audio dans les réglages, puis configurez la vidéo et le son. Cliquez sur Démarrer l’enregistrement. En mode Écran, faites glisser pour choisir une zone, ajustez les commandes, puis cliquez sur le bouton rouge."],
            ["Autorisations", "FTRecord peut nécessiter les autorisations Écran et audio système, Caméra et Microphone. Ouvrez Réglages FTRecord > Autorisations pour voir leur état et accéder aux Réglages Système. Après avoir modifié l’accès à l’écran, quittez et rouvrez FTRecord."],
            ["Suspendre et arrêter", "Utilisez la barre flottante, l’icône de barre des menus ou vos raccourcis globaux pour suspendre, reprendre ou arrêter. Une bordure rouge et une barre de contrôle visible signalent un enregistrement d’écran actif."],
            ["Enregistrements, stockage et récupération", "Les fichiers sont enregistrés par défaut dans Films/FTRecord. Choisissez un autre dossier dans Réglages > Enregistrement. La médiathèque permet de prévisualiser, renommer, afficher, partager, élaguer ou supprimer. Après une interruption, ouvrez Récupération pour restaurer les fragments lisibles ou les abandonner."],
            ["Contact", "Pour obtenir de l’aide, signaler un problème ou envoyer un avis, contactez le développeur sur GitHub. Indiquez les versions de macOS et FTRecord, le mode, l’état des autorisations et les étapes de reproduction. Ne joignez aucun enregistrement, mot de passe ou contenu sensible."]
        ]
    },
    de: {
        navPrivacy: "Datenschutz", navSupport: "Support",
        homeTagline: "Klar aufnehmen. Lokal behalten.",
        homeSummary: "Bildschirm-, Kamera- und Audioaufnahme für deinen Mac – ohne Konto, Analyse oder Cloud-Upload.",
        privacyAction: "Datenschutz lesen", supportAction: "Support öffnen",
        localTitle: "Von Grund auf lokal", localBody: "Aufnahmen und Einstellungen bleiben auf deinem Mac.",
        controlTitle: "Du bestimmst die Aufnahme", controlBody: "Bildschirm, Fenster, Bereich, Kamera, Mikrofon und Systemaudio bleiben unter deiner Kontrolle.",
        recoveryTitle: "Integrierte Wiederherstellung", recoveryBody: "Unterbrochene Aufnahmen lassen sich aus lokalen, abspielbaren Fragmenten wiederherstellen.",
        privacyTitle: "Datenschutz", privacySummary: "Deine Aufnahmen entstehen auf deinem Mac. FTRecord erfasst, überträgt, verkauft oder teilt keine personenbezogenen Daten.",
        noCollectionTitle: "Keine Erfassung", noCollectionBody: "Es werden keine Aufnahme- oder Nutzungsdaten an uns gesendet.",
        localProcessingTitle: "Lokale Verarbeitung", localProcessingBody: "Bildschirm, Kamera, Mikrofon und Systemaudio werden auf deinem Mac verarbeitet.",
        yourControlTitle: "Deine Kontrolle", yourControlBody: "Du startest jede Aufnahme, wählst den Speicherort und entscheidest über Teilen oder Löschen.",
        effectiveDate: "Gültig ab 14. September 2026",
        supportTitle: "Support", supportSummary: "Hilfe zu Aufnahme, Berechtigungen, lokalen Dateien und Wiederherstellung.",
        supportHeading: "FTRecord Support", requirements: "Erfordert macOS 15 oder neuer auf einem Mac mit Apple Chip",
        contactAction: "Auf GitHub kontaktieren",
        privacySections: [
            ["Übersicht und Aufnahmedaten", "FTRecord nimmt Medien vollständig auf deinem Mac auf und verarbeitet sie dort. Erst nach deinem ausdrücklichen Start verarbeitet die App gemäß deinen Einstellungen Bildschirm, gewählte Fenster oder Bereiche, Kameravideo, Mikrofon- und Systemaudio. Der Entwickler erfasst, überträgt, verkauft oder teilt diese Inhalte oder andere personenbezogene Daten nicht."],
            ["Berechtigungen", "FTRecord fragt macOS-Berechtigungen nur an, wenn eine Funktion Zugriff auf Bildschirmaufnahme, Systemaudio, Kamera oder Mikrofon benötigt. Du kannst sie in den Systemeinstellungen prüfen oder widerrufen. Betroffene Funktionen bleiben deaktiviert, bis der Zugriff wieder erlaubt wird."],
            ["Dateien und Wiederherstellung", "Aufnahmen werden lokal gespeichert, standardmäßig unter Filme/FTRecord. Bei Auswahl eines anderen Ordners kann ein sicherheitsbezogenes Lesezeichen auf deinem Mac gespeichert werden. Temporäre Wiederherstellungsdaten können in Application Support liegen und werden nach Abschluss, Wiederherstellung oder Verwerfen entfernt."],
            ["Teilen", "FTRecord öffnet die macOS-Freigabe nur auf deinen Befehl. Die Übertragung erfolgt durch den gewählten Dienst und unterliegt dessen Datenschutzregeln. FTRecord lädt Aufnahmen nicht selbst hoch."],
            ["Einstellungen, Konten und Analyse", "Aufnahmeeinstellungen, Kurzbefehle, Ersteinrichtungsstatus und Anmeldeobjekt-Einstellung werden lokal gespeichert. FTRecord hat keine Konten, Werbung, Analyse, Nachverfolgung, Cloud-Synchronisierung oder Datenerfassungs-SDKs."],
            ["Aufbewahrung, Löschung und Kontakt", "Da der Entwickler keine personenbezogenen Daten auf einem Server erfasst, gibt es dort nichts aufzubewahren oder zu löschen. Aufnahmen verwaltest du über FTRecord oder den Finder. Durch Löschen der App und ihrer Daten werden lokale Einstellungen und Wiederherstellungsdaten entfernt. Änderungen werden vor Veröffentlichung hier und im App Store offengelegt. Fragen beantwortet die Supportseite oder der Entwickler auf GitHub."]
        ],
        supportSections: [
            ["Aufnahme starten", "Öffne FTRecord, wähle in den Einstellungen Bildschirm, Kamera oder Audio und konfiguriere Video und Ton. Klicke auf Aufnahme starten. Ziehe im Bildschirmmodus einen Bereich auf, passe bei Bedarf die Vorbereitung an und klicke auf den roten Aufnahmebutton."],
            ["Berechtigungen", "FTRecord benötigt möglicherweise Bildschirm & Systemaudio, Kamera und Mikrofon. Unter FTRecord Einstellungen > Berechtigungen siehst du den Status und gelangst zu den Systemeinstellungen. Beende und öffne FTRecord nach einer Änderung der Bildschirmaufnahme erneut."],
            ["Pausieren und stoppen", "Nutze die schwebende Steuerung, das Menüleistensymbol oder globale Kurzbefehle zum Pausieren, Fortsetzen oder Stoppen. Ein roter Rahmen und die sichtbare Steuerung zeigen eine aktive Bildschirmaufnahme an."],
            ["Aufnahmen, Speicher und Wiederherstellung", "Standardmäßig werden Aufnahmen unter Filme/FTRecord gespeichert. Einen anderen Ordner wählst du unter Einstellungen > Aufnahme. In der Mediathek kannst du Dateien ansehen, umbenennen, anzeigen, teilen, trimmen oder löschen. Öffne nach einer Unterbrechung Wiederherstellung, um abspielbare Fragmente wiederherzustellen oder zu verwerfen."],
            ["Kontakt", "Für Support, Fehlerberichte oder Feedback kontaktiere den Entwickler auf GitHub. Nenne macOS- und FTRecord-Version, Aufnahmemodus, Berechtigungsstatus und Schritte zur Reproduktion. Sende keine Aufnahmen, Passwörter oder vertraulichen Daten."]
        ]
    },
    es: {
        navPrivacy: "Privacidad", navSupport: "Soporte",
        homeTagline: "Graba con claridad. Guárdalo en local.",
        homeSummary: "Grabación de pantalla, cámara y audio para tu Mac, sin cuentas, análisis ni cargas en la nube.",
        privacyAction: "Leer la política de privacidad", supportAction: "Obtener soporte",
        localTitle: "Local desde el diseño", localBody: "Las grabaciones y preferencias permanecen en tu Mac.",
        controlTitle: "Tú eliges qué capturar", controlBody: "Pantalla, ventana, región, cámara, micrófono y audio del sistema permanecen bajo tu control.",
        recoveryTitle: "Recuperación integrada", recoveryBody: "Las grabaciones interrumpidas se pueden recuperar desde fragmentos locales reproducibles.",
        privacyTitle: "Política de privacidad", privacySummary: "Tus grabaciones se crean en tu Mac. FTRecord no recopila, transmite, vende ni comparte datos personales.",
        noCollectionTitle: "Sin recopilación", noCollectionBody: "No se nos envían grabaciones ni datos de uso.",
        localProcessingTitle: "Procesamiento local", localProcessingBody: "La pantalla, cámara, micrófono y audio del sistema se procesan en tu Mac.",
        yourControlTitle: "Bajo tu control", yourControlBody: "Tú inicias cada grabación, eliges dónde guardarla y decides si compartirla o eliminarla.",
        effectiveDate: "Vigente desde el 14 de septiembre de 2026",
        supportTitle: "Soporte", supportSummary: "Ayuda sobre grabación, permisos, archivos locales y recuperación.",
        supportHeading: "Soporte de FTRecord", requirements: "Requiere macOS 15 o posterior en un Mac con chip de Apple",
        contactAction: "Contactar en GitHub",
        privacySections: [
            ["Resumen y datos de grabación", "FTRecord graba y procesa contenido íntegramente en tu Mac. Solo después de que inicies una grabación puede procesar la pantalla, ventanas o regiones seleccionadas, vídeo de cámara, audio del micrófono y audio del sistema según tus ajustes. El desarrollador no recopila, transmite, vende ni comparte este contenido u otros datos personales."],
            ["Permisos", "FTRecord solicita permisos de macOS solo cuando una función necesita grabación de pantalla, audio del sistema, cámara o micrófono. Puedes revisarlos o revocarlos en Ajustes del Sistema. Las funciones afectadas dejarán de funcionar hasta que restaures el acceso."],
            ["Archivos y recuperación", "Las grabaciones se guardan localmente, de forma predeterminada en Películas/FTRecord. Si eliges otra carpeta, puede guardarse un marcador con ámbito de seguridad en tu Mac. Durante la grabación puede almacenarse información temporal de recuperación en Application Support, que se elimina al completar, recuperar o descartar."],
            ["Compartir", "FTRecord abre el panel de compartir de macOS solo cuando eliges Compartir. La transferencia la realiza el servicio seleccionado y se rige por su política de privacidad. FTRecord no sube grabaciones por sí mismo."],
            ["Preferencias, cuentas y análisis", "Los ajustes de grabación, atajos, estado inicial y preferencia de inicio de sesión se guardan localmente. FTRecord no tiene cuentas, publicidad, análisis, seguimiento, sincronización en la nube ni SDK de terceros que recopilen datos."],
            ["Conservación, eliminación y contacto", "Como no se recopilan datos personales en servidores del desarrollador, no hay datos remotos que conservar o eliminar. Controlas las grabaciones desde FTRecord o Finder. Al eliminar la app y sus datos se borran preferencias e información de recuperación locales. Cualquier cambio se publicará aquí y en la información de privacidad del App Store antes del lanzamiento. Para consultas, usa la página de soporte o GitHub."]
        ],
        supportSections: [
            ["Iniciar una grabación", "Abre FTRecord, elige Pantalla, Cámara o Audio en Ajustes y configura el vídeo y el sonido. Pulsa Iniciar grabación. En el modo Pantalla, arrastra para seleccionar una región, ajusta los controles si es necesario y pulsa el botón rojo."],
            ["Permisos", "FTRecord puede necesitar permisos de Pantalla y audio del sistema, Cámara y Micrófono. Abre Ajustes de FTRecord > Permisos para ver el estado y acceder a Ajustes del Sistema. Tras cambiar el permiso de pantalla, cierra y vuelve a abrir FTRecord."],
            ["Pausar y detener", "Usa la barra flotante, el icono de la barra de menús o los atajos globales para pausar, reanudar o detener. Un borde rojo y la barra visible indican una grabación de pantalla activa."],
            ["Grabaciones, almacenamiento y recuperación", "Las grabaciones se guardan por defecto en Películas/FTRecord. Elige otra carpeta en Ajustes > Grabación. La biblioteca permite previsualizar, renombrar, mostrar, compartir, recortar o eliminar. Si se interrumpe una sesión, abre Recuperación para recuperar fragmentos reproducibles o descartarlos."],
            ["Contacto", "Para soporte, errores o sugerencias, contacta con el desarrollador en GitHub. Incluye las versiones de macOS y FTRecord, modo de grabación, permisos y pasos para reproducir el problema. No incluyas grabaciones, contraseñas ni información sensible."]
        ]
    },
    "pt-BR": {
        navPrivacy: "Privacidade", navSupport: "Suporte",
        homeTagline: "Grave com clareza. Mantenha tudo local.",
        homeSummary: "Gravação de tela, câmera e áudio feita para o seu Mac, sem contas, análises ou envio para a nuvem.",
        privacyAction: "Ler a política de privacidade", supportAction: "Obter suporte",
        localTitle: "Local por princípio", localBody: "Gravações e preferências permanecem no seu Mac.",
        controlTitle: "Você escolhe o que capturar", controlBody: "Tela, janela, região, câmera, microfone e áudio do sistema ficam sob seu controle.",
        recoveryTitle: "Recuperação integrada", recoveryBody: "Gravações interrompidas podem ser recuperadas de fragmentos locais reproduzíveis.",
        privacyTitle: "Política de Privacidade", privacySummary: "Suas gravações são criadas no Mac. O FTRecord não coleta, transmite, vende nem compartilha dados pessoais.",
        noCollectionTitle: "Sem coleta", noCollectionBody: "Nenhuma gravação ou dado de uso é enviado para nós.",
        localProcessingTitle: "Processamento local", localProcessingBody: "Tela, câmera, microfone e áudio do sistema são processados no seu Mac.",
        yourControlTitle: "Sob seu controle", yourControlBody: "Você inicia cada gravação, escolhe onde salvar e decide quando compartilhar ou excluir.",
        effectiveDate: "Em vigor desde 14 de setembro de 2026",
        supportTitle: "Suporte", supportSummary: "Orientações sobre gravação, permissões, arquivos locais e recuperação.",
        supportHeading: "Suporte do FTRecord", requirements: "Requer macOS 15 ou posterior em um Mac com Apple silicon",
        contactAction: "Entrar em contato pelo GitHub",
        privacySections: [
            ["Visão geral e dados de gravação", "O FTRecord grava e processa mídia inteiramente no seu Mac. Somente após você iniciar explicitamente uma gravação, ele pode processar a tela, janelas ou regiões selecionadas, vídeo da câmera, áudio do microfone e áudio do sistema conforme seus ajustes. O desenvolvedor não coleta, transmite, vende nem compartilha esse conteúdo ou outros dados pessoais."],
            ["Permissões", "O FTRecord solicita permissões do macOS apenas quando um recurso precisa de gravação de tela, áudio do sistema, câmera ou microfone. Você pode revisar ou revogar essas permissões nos Ajustes do Sistema. Os recursos afetados deixam de funcionar até o acesso ser restaurado."],
            ["Arquivos e recuperação", "As gravações são salvas localmente, por padrão em Filmes/FTRecord. Se você escolher outra pasta, um marcador com escopo de segurança pode ser armazenado no Mac. Durante a gravação, informações temporárias de recuperação podem ser salvas em Application Support e são removidas após conclusão, recuperação ou descarte."],
            ["Compartilhamento", "O FTRecord abre o painel de compartilhamento do macOS apenas quando você escolhe Compartilhar. A transferência é feita pelo serviço selecionado e segue a política de privacidade dele. O FTRecord não envia gravações por conta própria."],
            ["Preferências, contas e análises", "Ajustes de gravação, atalhos, status da configuração inicial e preferência de início de sessão são armazenados localmente. O FTRecord não tem contas, publicidade, análises, rastreamento, sincronização em nuvem ou SDKs de terceiros que coletem dados."],
            ["Retenção, exclusão e contato", "Como nenhum dado pessoal é coletado em servidor do desenvolvedor, não há dados remotos para reter ou excluir. Você controla as gravações pelo FTRecord ou Finder. Remover o app e seus dados apaga preferências e informações de recuperação locais. Mudanças serão publicadas aqui e nas informações de privacidade da App Store antes do lançamento. Para dúvidas, use a página de suporte ou o GitHub."]
        ],
        supportSections: [
            ["Iniciar uma gravação", "Abra o FTRecord, escolha Tela, Câmera ou Áudio nos Ajustes e configure vídeo e som. Clique em Iniciar Gravação. No modo Tela, arraste para selecionar uma região, ajuste os controles se necessário e clique no botão vermelho."],
            ["Permissões", "O FTRecord pode precisar das permissões Tela e Áudio do Sistema, Câmera e Microfone. Abra Ajustes do FTRecord > Permissões para ver o status e acessar os Ajustes do Sistema. Após alterar a gravação de tela, encerre e abra o FTRecord novamente."],
            ["Pausar e parar", "Use a barra flutuante, o ícone da barra de menus ou os atalhos globais para pausar, retomar ou parar. Uma borda vermelha e a barra visível indicam uma gravação de tela ativa."],
            ["Gravações, armazenamento e recuperação", "As gravações são salvas em Filmes/FTRecord por padrão. Escolha outra pasta em Ajustes > Gravação. A biblioteca permite visualizar, renomear, mostrar, compartilhar, recortar ou excluir. Se uma sessão for interrompida, abra Recuperação para recuperar fragmentos reproduzíveis ou descartá-los."],
            ["Contato", "Para suporte, relatos de erro ou sugestões, contate o desenvolvedor pelo GitHub. Inclua as versões do macOS e FTRecord, o modo de gravação, o status das permissões e os passos para reproduzir. Não inclua gravações, senhas ou informações confidenciais."]
        ]
    },
    ja: {
        navPrivacy: "プライバシー", navSupport: "サポート",
        homeTagline: "鮮明に収録。データはローカルに。",
        homeSummary: "アカウント、分析、クラウドアップロードなしで使える、Mac向けの画面・カメラ・オーディオ収録ツールです。",
        privacyAction: "プライバシーポリシーを読む", supportAction: "サポートを見る",
        localTitle: "ローカルを前提に設計", localBody: "収録ファイルと設定はMac内に保存されます。",
        controlTitle: "収録対象は自分で選択", controlBody: "画面、ウインドウ、領域、カメラ、マイク、システムオーディオを自分で管理できます。",
        recoveryTitle: "復元機能を内蔵", recoveryBody: "中断された収録は、再生可能なローカルフラグメントから復元できます。",
        privacyTitle: "プライバシーポリシー", privacySummary: "収録ファイルはMac上で作成されます。FTRecordは個人データを収集、送信、販売、共有しません。",
        noCollectionTitle: "データ収集なし", noCollectionBody: "収録内容や利用データが当方へ送信されることはありません。",
        localProcessingTitle: "ローカル処理", localProcessingBody: "画面、カメラ、マイク、システムオーディオはMac上で処理されます。",
        yourControlTitle: "ユーザーによる管理", yourControlBody: "収録の開始、保存先、共有、削除はすべてユーザーが決定します。",
        effectiveDate: "施行日：2026年9月14日",
        supportTitle: "サポート", supportSummary: "収録、アクセス権、ローカルファイル、復元についてご案内します。",
        supportHeading: "FTRecord サポート", requirements: "Appleシリコン搭載MacとmacOS 15以降が必要です",
        contactAction: "GitHubで連絡",
        privacySections: [
            ["概要と収録データ", "FTRecordはメディアの収録と処理をすべてMac上で行います。ユーザーが明示的に収録を開始した後に限り、設定に応じて画面、選択したウインドウや領域、カメラ映像、マイク音声、システムオーディオを処理します。開発者がこれらの内容やその他の個人データを収集、送信、販売、共有することはありません。"],
            ["アクセス権", "FTRecordは、機能に必要な場合にのみ画面収録、システムオーディオ、カメラ、マイクへのmacOSアクセス権を要求します。アクセス権はシステム設定で確認または取り消せます。取り消した機能は、再度許可するまで利用できません。"],
            ["ファイルと復元", "収録はローカルに保存され、初期設定の保存先はムービー/FTRecordです。別のフォルダを選ぶと、セキュリティスコープ付きブックマークがMacに保存される場合があります。収録中は一時的な復元情報がApplication Supportに保存され、完了、復元、破棄後に削除されます。"],
            ["共有", "FTRecordはユーザーが共有を選んだ場合にのみmacOSの共有画面を開きます。転送は選択したサービスが実行し、そのサービスのプライバシー条件が適用されます。FTRecordが自動的に収録をアップロードすることはありません。"],
            ["設定、アカウント、分析", "収録設定、ショートカット、初回設定の状態、ログイン項目の設定はローカルに保存されます。FTRecordにはアカウント、広告、分析、トラッキング、クラウド同期、データ収集を行う外部SDKはありません。"],
            ["保存、削除、お問い合わせ", "開発者のサーバーで個人データを収集しないため、サーバー側で保存または削除する個人データはありません。収録はFTRecordまたはFinderで管理できます。アプリと関連データを削除すると、ローカル設定と復元情報も削除されます。取り扱いが変わる場合は公開前に本ポリシーとApp Storeの情報を更新します。ご質問はサポートページまたはGitHubからお問い合わせください。"]
        ],
        supportSections: [
            ["収録を開始", "FTRecordを開き、設定で画面、カメラ、またはオーディオを選び、映像と音声を設定します。収録を開始をクリックします。画面モードでは領域をドラッグして選択し、必要に応じて準備コントロールを調整して赤いボタンをクリックします。"],
            ["アクセス権", "FTRecordには画面とシステムオーディオ、カメラ、マイクへのアクセス権が必要な場合があります。FTRecord設定 > アクセス権で状態を確認し、システム設定を開けます。画面収録の設定を変更した後はFTRecordを終了して開き直してください。"],
            ["一時停止と停止", "フローティングコントロール、メニューバーアイコン、またはグローバルショートカットで一時停止、再開、停止できます。赤い枠と表示中のコントロールバーは画面収録中であることを示します。"],
            ["収録、保存、復元", "収録は初期設定でムービー/FTRecordに保存されます。設定 > 収録で別のフォルダを選べます。メディアライブラリでは再生、名前変更、Finder表示、共有、トリミング、削除ができます。中断した場合は復元を開き、再生可能なフラグメントを復元または破棄します。"],
            ["お問い合わせ", "サポート、不具合報告、ご意見はGitHubから開発者へお寄せください。macOSとFTRecordのバージョン、収録モード、アクセス権の状態、再現手順を記載し、収録内容、パスワード、機密情報は送らないでください。"]
        ]
    },
    ko: {
        navPrivacy: "개인정보", navSupport: "지원",
        homeTagline: "선명하게 녹화하고 로컬에 보관하세요.",
        homeSummary: "계정, 분석 또는 클라우드 업로드 없이 사용하는 Mac용 화면, 카메라 및 오디오 녹화 도구입니다.",
        privacyAction: "개인정보 처리방침 보기", supportAction: "지원 받기",
        localTitle: "로컬 중심 설계", localBody: "녹화 파일과 환경설정은 Mac에 보관됩니다.",
        controlTitle: "캡처 대상 직접 선택", controlBody: "화면, 윈도우, 영역, 카메라, 마이크 및 시스템 오디오를 직접 제어합니다.",
        recoveryTitle: "내장 복구 기능", recoveryBody: "중단된 녹화를 재생 가능한 로컬 조각에서 복구할 수 있습니다.",
        privacyTitle: "개인정보 처리방침", privacySummary: "녹화 파일은 Mac에서 생성됩니다. FTRecord는 개인정보를 수집, 전송, 판매 또는 공유하지 않습니다.",
        noCollectionTitle: "수집하지 않음", noCollectionBody: "녹화 또는 사용 데이터가 개발자에게 전송되지 않습니다.",
        localProcessingTitle: "로컬 처리", localProcessingBody: "화면, 카메라, 마이크 및 시스템 오디오는 Mac에서 처리됩니다.",
        yourControlTitle: "사용자 제어", yourControlBody: "모든 녹화를 직접 시작하고 저장 위치와 공유 또는 삭제 여부를 결정합니다.",
        effectiveDate: "시행일: 2026년 9월 14일",
        supportTitle: "지원", supportSummary: "녹화, 권한, 로컬 파일 및 복구 사용 방법을 안내합니다.",
        supportHeading: "FTRecord 지원", requirements: "Apple Silicon Mac 및 macOS 15 이상 필요",
        contactAction: "GitHub에서 문의",
        privacySections: [
            ["개요 및 녹화 데이터", "FTRecord는 미디어를 Mac에서만 녹화하고 처리합니다. 사용자가 명시적으로 녹화를 시작한 후에만 설정에 따라 화면, 선택한 윈도우나 영역, 카메라 영상, 마이크 오디오 및 시스템 오디오를 처리합니다. 개발자는 이러한 콘텐츠나 기타 개인정보를 수집, 전송, 판매 또는 공유하지 않습니다."],
            ["권한", "FTRecord는 기능에 필요한 경우에만 macOS 화면 녹화, 시스템 오디오, 카메라 또는 마이크 권한을 요청합니다. 시스템 설정에서 권한을 확인하거나 취소할 수 있습니다. 취소된 권한이 필요한 기능은 접근 권한을 다시 허용할 때까지 작동하지 않습니다."],
            ["파일 및 복구", "녹화 파일은 로컬에 저장되며 기본 위치는 동영상/FTRecord입니다. 다른 폴더를 선택하면 보안 범위 책갈피가 Mac에 저장될 수 있습니다. 녹화 중 임시 복구 정보가 Application Support에 저장될 수 있으며 완료, 복구 또는 폐기 후 삭제됩니다."],
            ["공유", "FTRecord는 사용자가 공유를 선택한 경우에만 macOS 공유 패널을 엽니다. 전송은 선택한 서비스에서 수행하며 해당 서비스의 개인정보 보호정책이 적용됩니다. FTRecord는 녹화를 자체적으로 업로드하지 않습니다."],
            ["환경설정, 계정 및 분석", "녹화 설정, 단축키 선택, 최초 실행 상태 및 로그인 항목 환경설정은 로컬에 저장됩니다. FTRecord에는 계정, 광고, 분석, 추적, 클라우드 동기화 또는 데이터 수집용 타사 SDK가 없습니다."],
            ["보관, 삭제 및 문의", "개발자 서버에서 개인정보를 수집하지 않으므로 서버에 보관하거나 삭제할 개인정보가 없습니다. FTRecord 또는 Finder에서 녹화를 관리할 수 있습니다. 앱과 관련 데이터를 제거하면 로컬 환경설정 및 복구 정보가 삭제됩니다. 처리 방식이 변경되면 출시 전에 본 방침과 App Store 정보를 업데이트합니다. 문의는 지원 페이지 또는 GitHub를 이용하세요."]
        ],
        supportSections: [
            ["녹화 시작", "FTRecord를 열고 설정에서 화면, 카메라 또는 오디오를 선택한 다음 비디오와 오디오 옵션을 구성합니다. 녹화 시작을 클릭하세요. 화면 모드에서는 드래그하여 영역을 선택하고 필요한 경우 준비 제어기를 조정한 후 빨간색 녹화 버튼을 클릭합니다."],
            ["권한", "FTRecord에는 화면 및 시스템 오디오, 카메라, 마이크 권한이 필요할 수 있습니다. FTRecord 설정 > 권한에서 상태를 확인하고 macOS 시스템 설정을 열 수 있습니다. 화면 녹화 접근 권한을 변경한 후에는 FTRecord를 종료하고 다시 여세요."],
            ["일시 정지 및 중지", "플로팅 제어 막대, 메뉴 막대 아이콘 또는 전역 단축키를 사용하여 일시 정지, 재개 또는 중지할 수 있습니다. 빨간색 테두리와 표시된 제어 막대는 화면 녹화 중임을 나타냅니다."],
            ["녹화, 저장 공간 및 복구", "녹화는 기본적으로 동영상/FTRecord에 저장됩니다. 설정 > 녹화에서 다른 폴더를 선택할 수 있습니다. 미디어 보관함에서 미리보기, 이름 변경, Finder에서 보기, 공유, 트리밍 또는 삭제가 가능합니다. 세션이 중단되면 복구를 열어 재생 가능한 조각을 복구하거나 폐기하세요."],
            ["문의", "지원, 버그 신고 또는 의견은 GitHub를 통해 개발자에게 문의하세요. macOS 및 FTRecord 버전, 녹화 모드, 권한 상태와 재현 단계를 포함하고 녹화 파일, 비밀번호 또는 민감한 정보는 보내지 마세요."]
        ]
    },
    ru: {
        navPrivacy: "Конфиденциальность", navSupport: "Поддержка",
        homeTagline: "Записывайте чётко. Храните локально.",
        homeSummary: "Запись экрана, камеры и звука для Mac без учётных записей, аналитики и загрузки в облако.",
        privacyAction: "Прочитать политику", supportAction: "Получить поддержку",
        localTitle: "Изначально локально", localBody: "Записи и настройки остаются на вашем Mac.",
        controlTitle: "Вы выбираете, что записывать", controlBody: "Экран, окно, область, камера, микрофон и системный звук остаются под вашим контролем.",
        recoveryTitle: "Встроенное восстановление", recoveryBody: "Прерванные записи можно восстановить из воспроизводимых локальных фрагментов.",
        privacyTitle: "Политика конфиденциальности", privacySummary: "Записи создаются на вашем Mac. FTRecord не собирает, не передаёт, не продаёт и не раскрывает персональные данные.",
        noCollectionTitle: "Без сбора данных", noCollectionBody: "Записи и сведения об использовании нам не отправляются.",
        localProcessingTitle: "Локальная обработка", localProcessingBody: "Экран, камера, микрофон и системный звук обрабатываются на вашем Mac.",
        yourControlTitle: "Ваш контроль", yourControlBody: "Вы запускаете каждую запись, выбираете место сохранения и решаете, делиться ею или удалить.",
        effectiveDate: "Действует с 14 сентября 2026 года",
        supportTitle: "Поддержка", supportSummary: "Помощь с записью, разрешениями, локальными файлами и восстановлением.",
        supportHeading: "Поддержка FTRecord", requirements: "Требуется Mac с Apple silicon и macOS 15 или новее",
        contactAction: "Связаться через GitHub",
        privacySections: [
            ["Обзор и данные записи", "FTRecord записывает и обрабатывает медиафайлы полностью на вашем Mac. Только после явного запуска записи приложение может обрабатывать экран, выбранные окна или области, видео с камеры, звук микрофона и системный звук согласно настройкам. Разработчик не собирает, не передаёт, не продаёт и не раскрывает этот контент или другие персональные данные."],
            ["Разрешения", "FTRecord запрашивает разрешения macOS только тогда, когда функции нужен доступ к записи экрана, системному звуку, камере или микрофону. Разрешения можно просмотреть или отозвать в Системных настройках. Связанные функции не будут работать до повторного предоставления доступа."],
            ["Файлы и восстановление", "Записи хранятся локально, по умолчанию в папке Фильмы/FTRecord. При выборе другой папки на Mac может сохраняться закладка с областью безопасности. Во время записи временные сведения для восстановления могут храниться в Application Support и удаляются после завершения, восстановления или отказа."],
            ["Публикация", "FTRecord открывает меню «Поделиться» macOS только по вашей команде. Передачу выполняет выбранная служба в соответствии со своей политикой конфиденциальности. FTRecord не загружает записи самостоятельно."],
            ["Настройки, учётные записи и аналитика", "Параметры записи, сочетания клавиш, состояние первого запуска и настройка входа сохраняются локально. В FTRecord нет учётных записей, рекламы, аналитики, отслеживания, облачной синхронизации или сторонних SDK для сбора данных."],
            ["Хранение, удаление и связь", "Разработчик не собирает персональные данные на сервере, поэтому там нечего хранить или удалять. Вы управляете записями через FTRecord или Finder. Удаление приложения и связанных данных удаляет локальные настройки и сведения для восстановления. Об изменениях будет сообщено здесь и в информации App Store до выпуска. Для вопросов используйте страницу поддержки или GitHub."]
        ],
        supportSections: [
            ["Начало записи", "Откройте FTRecord, выберите в настройках Экран, Камера или Аудио и задайте параметры видео и звука. Нажмите «Начать запись». В режиме экрана выделите область перетаскиванием, при необходимости измените параметры и нажмите красную кнопку."],
            ["Разрешения", "FTRecord могут потребоваться разрешения на экран и системный звук, камеру и микрофон. Откройте Настройки FTRecord > Разрешения, чтобы увидеть состояние и перейти в Системные настройки. После изменения доступа к экрану завершите и снова откройте FTRecord."],
            ["Пауза и остановка", "Используйте плавающую панель, значок в строке меню или глобальные сочетания клавиш для паузы, продолжения и остановки. Красная рамка и видимая панель управления показывают, что запись экрана активна."],
            ["Записи, хранение и восстановление", "По умолчанию записи сохраняются в Фильмы/FTRecord. Другую папку можно выбрать в Настройки > Запись. Медиатека позволяет просматривать, переименовывать, показывать, публиковать, обрезать и удалять записи. После прерывания откройте Восстановление, чтобы восстановить воспроизводимые фрагменты или удалить их."],
            ["Связь", "Для поддержки, сообщения об ошибке или обратной связи свяжитесь с разработчиком через GitHub. Укажите версии macOS и FTRecord, режим записи, состояние разрешений и шаги воспроизведения. Не отправляйте записи, пароли или конфиденциальные данные."]
        ]
    }
};

function preferredLocale() {
    const savedLocale = localStorage.getItem("ftrecord-locale");
    if (savedLocale && copy[savedLocale]) {
        return savedLocale;
    }
    const browserLanguage = (navigator.language || "en").toLowerCase();
    return localeMap[browserLanguage.split("-")[0]] || "en";
}

function renderSections(content) {
    const container = document.querySelector("[data-sections]");
    if (!container) {
        return;
    }
    container.replaceChildren(...content.map(([title, body], index) => {
        const section = document.createElement("section");
        section.className = "policy-section reveal";
        const heading = document.createElement("h3");
        heading.textContent = title;
        const paragraph = document.createElement("p");
        paragraph.textContent = body;
        section.append(heading, paragraph);
        if (index === content.length - 1) {
            const actions = document.createElement("div");
            actions.className = "actions";
            const contact = document.createElement("a");
            contact.className = "button primary";
            contact.href = "https://github.com/shxlxa";
            contact.textContent = copy[document.documentElement.lang].contactAction;
            const privacy = document.createElement("a");
            privacy.className = "button";
            if (document.body.dataset.page === "support") {
                privacy.href = "../privacy/";
                privacy.textContent = copy[document.documentElement.lang].privacyAction;
                actions.append(contact, privacy);
            } else {
                privacy.href = "../support/";
                privacy.textContent = copy[document.documentElement.lang].supportAction;
                actions.append(privacy, contact);
            }
            section.append(actions);
        }
        return section;
    }));
}

function observeReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function applyLocale(locale) {
    const supportedLocale = copy[locale] ? locale : "en";
    const localized = copy[supportedLocale];
    document.documentElement.lang = supportedLocale;
    localStorage.setItem("ftrecord-locale", supportedLocale);
    document.querySelectorAll("[data-language-picker]").forEach((picker) => {
        picker.value = supportedLocale;
    });
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = localized[element.dataset.i18n];
        if (value) {
            element.textContent = value;
        }
    });

    const page = document.body.dataset.page;
    if (page === "privacy") {
        document.title = `${localized.privacyTitle} · FTRecord`;
        renderSections(localized.privacySections);
    } else if (page === "support") {
        document.title = `${localized.supportTitle} · FTRecord`;
        renderSections(localized.supportSections);
    } else {
        document.title = "FTRecord";
    }
    observeReveals();
}

document.addEventListener("DOMContentLoaded", () => {
    applyLocale(preferredLocale());
    document.querySelectorAll("[data-language-picker]").forEach((picker) => {
        picker.addEventListener("change", (event) => applyLocale(event.target.value));
    });
});
