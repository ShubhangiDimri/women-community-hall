// Past Events Details Functionality
document.addEventListener('DOMContentLoaded', function () {
    const pastEvents = {
        "mental-health": {
            title: "Mental Health Awareness Day",
            date: "April 15, 2025",
            time: "10:00 AM - 2:00 PM",
            location: "Main Hall",
            img: "https://resources.impactfireservices.com/hubfs/Blog%20Images/How-to-Run-a-Successful-Mental-Health-Awareness-Event-for-Your-Employees.jpg",
            about: "A day dedicated to raising awareness about mental health with expert talks and workshops.",
            topics: ["Mindfulness", "Stress Management", "Community Support"],
            highlights: [
                "https://classiebit.com/storage/Blog%20Images/Mental%20Health%20Image%201_1.webp ",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HnIIxwbQFvtbnLnOO6iN8whp3AYc384hsw&s ",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgHkRvF268f47QX6i-dZZGGeI3eJPpdyq6CQ&s"
            ],
            testimonials: [
                {
                    name: "Priya Sharma",
                    text: "This event helped me understand the importance of mental health. The speakers were amazing!"
                },
                {
                    name: "Amit Patel",
                    text: "Very informative and supportive environment. Highly recommend!"
                }
            ]

        },
        "entrepreneurship": {
            title: "Entrepreneurship Panel",
            date: "April 18, 2025",
            time: "3:00 PM - 5:00 PM",
            location: "Conference Room",
            img: "https://theunitedindian.com/images/women-business-hero.jpg",
            about: "Hear from successful women entrepreneurs and learn how to start your own business.",
            topics: ["Startup Funding", "Networking", "Business Planning"],
            highlights: [
                "https://rizco.com/wp-content/uploads/2022/05/stockton-university-women-in-business-panel.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZvE0deSsbF21dn7A9INLyHYoUYtzXh47Fg&s ",
                "https://www.cambridgembastories.com/wp-content/uploads/2023/08/Women-in-Business-Panel-Cambridge-ATC-Daisy-scaled.jpg "
            ],
            testimonials: [
                {
                    text: "The panelists were incredibly inspiring. I've already started working on my business plan after attending this event.",
                    name: "Riya Gupta"
                },
                {
                    text: "The networking opportunities were fantastic. I met several potential collaborators for my startup idea.",
                    name: "Neha Kapoor"
                }
            ]
        },
        "potluck": {
            title: "Community Potluck",
            date: "April 10, 2025",
            time: "6:00 PM - 9:00 PM",
            location: "Outdoor Pavilion",
            img: "https://thumbs.dreamstime.com/z/potluck-community-dinner-where-dishes-different-cultures-traditions-come-together-to-create-diverse-delicious-meal-371167748.jpg",
            about: "A fun evening of food and community. Bring a dish to share!",
            topics: ["Community Building", "Cultural Exchange", "Fun Activities"],
            highlights: [
                "https://t4.ftcdn.net/jpg/10/36/92/05/360_F_1036920542_SCbu2fwYC60HNAFQBQy544LbbQ2VIUaZ.jpg ",
                "https://thecommunitygroup.org/wp-content/uploads/2019/06/Potluck-7-1024x576.jpeg ",
                "https://hips.hearstapps.com/hmg-prod/images/turkuterie-vertical-2-670ed227b52a3.jpg?crop=0.817xw:0.654xh;0.0929xw,0.145xh&resize=640:*"
            ],
            testimonials: [
                {
                    text: "What a wonderful way to meet neighbors! The cultural exchange was amazing with all the different dishes.",
                    name: "Sonia Mehta"
                },
                {
                    text: "My family and I had a great time. The kids especially loved the fun activities organized for them.",
                    name: "Deepika Joshi"
                }
            ]
        }
    };

    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function () {
            const eventKey = btn.getAttribute('data-event');
            const event = pastEvents[eventKey];
            if (!event) return;

            // Fill modal fields
            document.getElementById('past-event-title').textContent = event.title;
            document.getElementById('past-event-date').textContent = event.date;
            document.getElementById('past-event-time').textContent = event.time;
            document.getElementById('past-event-location').textContent = event.location;
            document.getElementById('past-event-img').src = event.img;
            document.getElementById('past-event-img').alt = event.title;
            document.getElementById('past-event-about').textContent = event.about;

            // Fill topics
            const topicsList = document.getElementById('past-event-topics');
            topicsList.innerHTML = '';
            event.topics.forEach(topic => {
                const li = document.createElement('li');
                li.textContent = topic;
                topicsList.appendChild(li);
            });

            // Fill highlights
            const galleryDiv = document.getElementById('event-gallery');
            galleryDiv.innerHTML = '';
            if (event.highlights && event.highlights.length) {
                event.highlights.forEach(url => {
                    const div = document.createElement('div');
                    div.className = 'gallery-item';
                    div.innerHTML = `<img src="${url}" alt="Event Highlight">`;
                    galleryDiv.appendChild(div);
                });
            }

            // Fill testimonials
            const testimonialsDiv = document.getElementById('event-testimonials');
            testimonialsDiv.innerHTML = '';
            if (event.testimonials && event.testimonials.length) {
                event.testimonials.forEach(t => {
                    const div = document.createElement('div');
                    div.className = 'testimonial';
                    div.innerHTML = `<blockquote>"${t.text}"</blockquote><p>- ${t.name}</p>`;
                    testimonialsDiv.appendChild(div);
                });
            }

            // Show modal
            document.getElementById('past-event-modal').style.display = 'flex';
        });
    });

    // Close modal on X click
    document.querySelector('#past-event-modal .close').onclick = function () {
        document.getElementById('past-event-modal').style.display = 'none';
    };
});