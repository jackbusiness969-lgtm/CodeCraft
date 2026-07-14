/* ==========================================================================
   PROJECTS DATA STORE
   Single source of truth for the project catalog. 
   ========================================================================== */
(function (global) {
    'use strict';

    var MY_PROJECTS = [
        {
            id: 1,
            title: 'ROYAL PURPLE THEME ESPORTS TOURNAMENT APPLICATION',
            category: 'Esports Tournament UI',
            shortDescription: 'Royal Purple is a premium Free Fire tournament UI featuring a modern esports design with a dark purple theme, smooth animations, responsive layout, tournament cards, match details, leaderboard, wallet, profile, and an admin-ready structure. Built with HTML5, CSS3, and JavaScript for a fast and professional user experience.',
            fullDescription: 'The Royal Purple Free Fire Tournament UI is a premium esports-inspired frontend designed for Free Fire tournament platforms. It combines a sleek dark purple interface with a modern user experience, making it ideal for tournament organizers and gaming communities.\n\nKey Features:\n• Premium Royal Purple esports theme\n• Fully responsive design for mobile and desktop\n• Modern tournament cards with detailed match pages\n• Match schedule, room ID, and result sections\n• Player profile, wallet, and leaderboard screens\n• Smooth animations and clean navigation\n• Optimized HTML5, CSS3, and JavaScript code\n• Secure Firebase backend integration (Authentication, Firestore/Realtime Database, Storage)\n• Production-ready backend architecture with scalable database structure\n• Security-focused implementation with Firebase Security Rules, secure authentication, protected admin access, and validation\n• Admin panel for tournament, match, and user management\n• Firebase-ready structure for easy customization\n• Custom color themes available to match your brand identity (e.g., Royal Purple, Sky Blue, Crimson Red)\n\nThis UI is designed to deliver a fast, visually appealing, and engaging experience while providing a strong foundation for building a complete tournament platform.',
            thumbnail: 'https://i.ibb.co/6c0FFX9z/Screenshot-20260706-180010-Chrome.jpg',
            screenshots: [
                'https://i.ibb.co/6c0FFX9z/Screenshot-20260706-180010-Chrome.jpg',
                'https://i.ibb.co/DPHJXGmn/Screenshot-20260713-183414-Chrome.jpg',
                'https://i.ibb.co/R4ZVgkKk/Screenshot-20260711-201541-Extreme-Battle.jpg'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'],
            oldPrice: '₹3,999',
            newPrice: '₹2,500',
            contactLink: 'https://t.me/imdevloper'
        }
    ];

    function loadProjects() {
        return MY_PROJECTS;
    }

    function getById(list, id) {
        var numId = Number(id);
        for (var i = 0; i < list.length; i++) {
            if (Number(list[i].id) === numId) return list[i];
        }
        return null;
    }

    global.ProjectsStore = {
        loadProjects: loadProjects,
        getById: getById
    };
})(window);