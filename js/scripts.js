/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 5, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300: 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

    
    /* Typing animation*/
    var typed = new Typed('#typed', {
        strings: [
            `I am <span style="color: orange; ">AWS Cloud</span> and <span style="color: blue;">DevOps</span> Engineer!`
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        html: true
    });


})(jQuery);



// Fetch GitHub Profile Info
const username = "koustubhjuvekar";
const profileCard = document.getElementById("profile");
const repoList = document.getElementById("repo-list");

// Fetch Profile
fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(user => {
    profileCard.innerHTML = `
      <img src="${user.avatar_url}" alt="Profile Picture">
      <h3>${user.name || user.login}</h3>
      <p>${user.bio || "Passionate Developer 🚀"}</p>
      <div class="profile-stats">
        👥 Followers: ${user.followers} | 🔗 Following: ${user.following} <br>
        📦 Public Repos: ${user.public_repos} | 🏙 Location: ${user.location || "N/A"} <br>
        🕒 Joined: ${new Date(user.created_at).toLocaleDateString()}
      </div>
    `;
  });

// Fetch Latest 4 Repositories
fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
  .then(res => res.json())
  .then(repos => {
    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "repo-card";
      card.innerHTML = `
        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
        <p>${repo.description || "No description available."}</p>
        <div class="repo-stats">
          ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🛠 ${repo.language || "N/A"}
        </div>
      `;
      repoList.appendChild(card);
    });
  });
