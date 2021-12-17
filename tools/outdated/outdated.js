const outdatedBrowserRework = require('outdated-browser-rework');
outdatedBrowserRework({
	browsersSupport: {
		IE: 9,
	},
	isUnknownBrowserOK: true,
	messages: {
		en: {
			outOfDate: 'Your browser is out of date!',
			unsupported: 'Your browser is not supported!',
			update: {
				web: 'Update your browser to view this website correctly. ',
				googlePlay: 'Please install Chrome from Google Play',
				appStore: 'Please update iOS from the Settings App',
			},
			// You can set the URL to null if you do not want a clickable link or provide
			// your own markup in the update.web message.
			url: 'https://www.google.com/intl/ru/chrome/',
			callToAction: 'Update my browser now',
			close: 'Close',
		},
		ru: {
			outOfDate: 'Ваш браузер устарел',
			unsupported: 'Браузер больше не поддерживается!',
			update: {
				web: 'Для корректного отображения необходимо обновить браузер ',
				googlePlay: 'Пожалуйста, установите браузер Chrome из GooglePlay',
				appStore: 'Пожалуйста, обновите вашу версию iOS в настройках',
			},
			// You can set the URL to null if you do not want a clickable link or provide
			// your own markup in the update.web message.
			url: 'https://www.google.com/intl/ru/chrome/',
			callToAction: 'Обновить браузер',
			close: 'Закрыть',
		},
	},
});
