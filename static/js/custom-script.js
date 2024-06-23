(function($) {
    "use strict";

    if ($('.booking-dataTable').length > 0) {
        $('.booking-dataTable').DataTable({
            processing: true,
            serverSide: true,
            order: [],
            ajax: "/agent/booking",
            columns: [
                { data: 'booking_start', name: 'booking_start' },
                { data: 'amount', name: 'amount' },
                { data: 'booking_id', name: 'booking_id' },
                { data: 'yacht', name: 'yacht' },
                { data: 'status', name: 'status' },
                { data: 'action', name: 'action', orderable: false, searchable: false },
            ]
        });
    }


    let guest = 1;
    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($('.preloader').length) {
            $('body').addClass('page-loaded');
            $('.preloader').delay(1000).fadeOut(0);
        }
    }

    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');
            var sticky_header = $('.main-header .sticky-header');
            if (windowpos > 180) {
                siteHeader.addClass('fixed-header');
                sticky_header.addClass("animated slideInDown");
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                sticky_header.removeClass("animated slideInDown");
                scrollLink.fadeOut(300);
            }
        }
    }

    headerStyle();

    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');

    }

    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        $('.mobile-menu .menu-box').mCustomScrollbar();

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
        });
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                $('#search-popup').removeClass('mobile-menu-visible');
                $('body').removeClass('mobile-menu-visible');
            }
        });
    }

    //Search Popup
    if ($('#search-popup').length) {

        //Show Popup
        $('.search-toggler').on('click', function() {
            $('#search-popup').addClass('popup-visible');
            $('body').addClass('search-visible');
        });
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                $('#search-popup').removeClass('popup-visible');
                $('body').removeClass('search-visible');
            }
        });
        //Hide Popup
        $('.close-search,.search-popup .overlay-layer').on('click', function() {
            $('#search-popup').removeClass('popup-visible');
            $('body').removeClass('search-visible');
        });
    }

    //Hidden Bar Menu Config
    function hiddenBarMenuConfig() {
        var menuWrap = $('.hidden-bar .side-menu');
        // hidding submenu 
        menuWrap.find('.dropdown').children('ul').hide();
        // toggling child ul
        menuWrap.find('li.dropdown > a').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $(this).parent('li.dropdown').children('ul').slideToggle();

                // adding class to item container
                $(this).parent().toggleClass('open');

                return false;

            });
        });
    }

    hiddenBarMenuConfig();


    //Hidden Sidebar
    if ($('.hidden-bar').length) {
        var hiddenBar = $('.hidden-bar');
        var hiddenBarOpener = $('.max-nav-toggler .toggle-btn');
        var hiddenBarCloser = $('.hidden-bar-closer');
        $('.hidden-bar-wrapper').mCustomScrollbar();

        //Show Sidebar
        hiddenBarOpener.on('click', function() {
            hiddenBar.addClass('visible-sidebar');
        });

        //Hide Sidebar
        hiddenBarCloser.on('click', function() {
            hiddenBar.removeClass('visible-sidebar');
        });

        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                hiddenBar.removeClass('visible-sidebar');
            }
        });

    }

    //Main Slider / Banner Carousel
    if ($('.banner-carousel').length) {
        $('.banner-carousel').owlCarousel({
            loop: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            margin: 0,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            autoplayTimeout: 7000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    //Services Carousel
    if ($('.services-carousel').length) {
        $('.services-carousel').owlCarousel({
            loop: true,
            margin: 35,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                }
            }
        });
    }

    //Activity Carousel
    if ($('.activity-carousel').length) {
        $('.activity-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1024: {
                    items: 2
                },
                1140: {
                    items: 1
                },
                1500: {
                    items: 1
                },
                1600: {
                    items: 2
                }
            }
        });
    }

    //Testimonial Carousel
    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 40,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1024: {
                    items: 2
                },
                1500: {
                    items: 2
                },
                1700: {
                    items: 3
                }
            }
        });
    }

    //Testimonial Carousel
    if ($('.testimonial-carousel-two').length) {
        $('.testimonial-carousel-two').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 2
                },
                1200: {
                    items: 2
                }
            }
        });
    }

    //Offer Carousel
    if ($('.offer-carousel').length) {
        $('.offer-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    //Facts Carousel
    if ($('.facts-carousel').length) {
        $('.facts-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    //Single Item Carousel
    if ($('.single-item-carousel').length) {
        $('.single-item-carousel').owlCarousel({
            loop: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            margin: 10,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    //Team Carousel
    if ($('.team-carousel').length) {
        $('.team-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1024: {
                    items: 3
                }
            }
        });
    }

    //Testimonials Carousel Three
    if ($('.testimonial-carousel-three').length) {
        $('.testimonial-carousel-three').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    //Event Carousel
    if ($('.event-carousel').length) {
        $('.event-carousel').owlCarousel({
            loop: true,
            margin: 60,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }

    //Event Carousel
    if ($('.featured-column-carousel').length) {
        $('.featured-column-carousel').owlCarousel({
            loop: true,
            margin: 50,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            autoplayTimeout: 5000,
            navText: ['<span class="icon flaticon-back"></span>', '<span class="icon flaticon-next"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 2
                }
            }
        });
    }

    // -------yatch details crowsel----------
    $('.owl-carousel').owlCarousel({
        autoplay:true,
        dots:true,
        autoplayTimeout:3000,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:true
            },
            1000:{
                items:3,
                nav:true,
                loop:true
            }
        }
    })

    //Coming Soon Scroll
    if ($('.yacht-details .scroller').length) {
        $('.yacht-details .scroller').mCustomScrollbar();
    }

    //Coming Soon Countdown Timer
    if ($('.time-countdown').length) {
        $('.time-countdown').each(function() {
            var $this = $(this),
                finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hrs</div>  ' + '<div class="counter-column"><span class="count">%M</span>Mins</div>  ' + '<div class="counter-column"><span class="count">%S</span>Secs</div>'));
            });
        });
    }

    //Datepicker
    if ($('.datepicker').length) {
        $(".datepicker").datepicker();
    }

    $('#yacht').on('change', function() {
        if ($(this).val()) {
            $.get("/yacht-detail/" + $(this).val(), function(data, status) {
                guest = parseInt(data.guest)
                $("#htmlGuest").html('Max Guests : ' + data.guest);
                $("#htmlGuest").removeClass('d-none');
            });
        } else {
            guest = 1
            $(".prod_qty").val(1);
            $("#htmlGuest").addClass('d-none');
        }
    });
    //Custom Quantity Spinner
    if ($('.quantity-spinner').length) {
        $('.quantity-spinner .plus').on('click', function() {
            var val = $(this).prev('.prod_qty').val();
            if (val < guest) {
                $(this).prev('.prod_qty').val((val * 1) + 1);
            } else {
                if ($("#yacht").val()) {
                    Swal.fire('ERROR!', 'Only ' + guest + ' guest allowed.', 'error')
                } else {
                    Swal.fire('ERROR!', 'Please Select Yacht First', 'error')
                }

            }

        });

        $('.quantity-spinner .minus').on('click', function() {
            var val = $(this).next('.prod_qty').val();
            if (val != 1) {
                $(this).next('.prod_qty').val((val * 1) - 1);
            }
        });
    }

    //Range Slider
    if ($('.range-slider-1').length) {
        $(".range-slider-1").slider({
            range: true,
            min: 0,
            max: 7500,
            values: [1000, 2500],
            slide: function(event, ui) {
                $("#amount-1").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount-1").val("$" + $(".range-slider-1").slider("values", 0) +
            " - $" + $(".range-slider-1").slider("values", 1));
    }

    //Dewfault Masonry
    function enableDefaultMasonry() {
        if ($('.masonry-container').length) {

            var winDow = $(window);
            // Needed variables
            var $container = $('.masonry-container');

            $container.isotope({
                itemSelector: '.masonry-item',
                masonry: {
                    columnWidth: '.masonry-item'
                },
                animationOptions: {
                    duration: 500,
                    easing: 'linear'
                }
            });
        }
    }
    enableDefaultMasonry();

    //Sortable Masonary with Filters
    function sortableMasonry() {
        if ($('.sortable-masonry').length) {

            var winDow = $(window);
            // Needed variables
            var $container = $('.sortable-masonry .items-container');
            var $filter = $('.filter-btns');

            $container.isotope({
                filter: '*',
                masonry: {
                    columnWidth: '.masonry-item'
                },
                animationOptions: {
                    duration: 500,
                    easing: 'linear'
                }
            });


            // Isotope Filter 
            $filter.find('li').on('click', function() {
                var selector = $(this).attr('data-filter');

                try {
                    $container.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 500,
                            easing: 'linear',
                            queue: false
                        }
                    });
                } catch (err) {

                }
                return false;
            });


            winDow.on('resize', function() {
                var selector = $filter.find('li.active').attr('data-filter');

                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: 'linear',
                        queue: false
                    }
                });
            });


            var filterItemA = $('.filter-btns li');

            filterItemA.on('click', function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    filterItemA.removeClass('active');
                    $this.addClass('active');
                }
            });
        }
    }
    sortableMasonry();

    //MixitUp Gallery Filters
    if ($('.filter-list').length) {
        $('.filter-list').mixItUp({});
    }

    //Info Popup
    if ($('.info-pop .close-btn').length) {
        $('.info-pop .close-btn').on('click', function(e) {
            e.preventDefault();
            $('.info-pop').slideUp(300);
        });
    }

    //Selectable List Dropdown
    if ($('.selectable-list .btn-box').length) {
        $('.dropdown-menu .filter').on('click', function(e) {
            var AltTextBox = $(this).parents('.selectable-list').find('.btn-box');
            var AltTextTitle = $(this).attr("data-change-text");
            $(AltTextBox).text(AltTextTitle);
        });
    }

    //Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }

    //Accordion Box
    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function() {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).next('.acc-content').is(':visible')) {
                //return false;
                $(this).removeClass('active');
                $(this).next('.acc-content').slideUp(300);
                $(outerBox).children('.accordion').removeClass('active-block');
            } else {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }

    //Custom Seclect Box
    if ($('.custom-select-box').length) {
        $('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
    }

    //LightBox / Fancybox
    if ($('.lightbox-image').length) {
        $('.lightbox-image').fancybox({
            openEffect: 'fade',
            closeEffect: 'fade',
            helpers: {
                media: {}
            }
        });
    }

    //Contact Form Validation
    // if ($('#contact-form').length) {
    //     $('#contact-form').validate({
    //         rules: {
    //             username: {
    //                 required: true
    //             },
    //             email: {
    //                 required: true,
    //                 email: true
    //             },
    //             subject: {
    //                 required: true
    //             },
    //             message: {
    //                 required: true
    //             }
    //         }
    //     });
    // }


    let contact = $("#contact-form");
    $(contact).submit(function(e) {
        e.preventDefault();
        let contactData = $(contact).serialize();
        $.ajax({
                type: 'POST',
                url: $(consult).attr('action'),
                data: contactData,
                dataType: "json",
            })
            .done(function(data) {
                if (data.sts) {
                    Swal.fire('Success!', 'Thank you for contacting us, we will contact you soon.', 'success');
                } else {
                    if (data.validate) {
                        Swal.fire('error!', 'Please provide full details.', 'error');

                    } else {
                        Swal.fire('error!', 'Something went wrong. Please try again later.', 'error');
                    }

                }
            });
    });


    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);

        });
    }

    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }


    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    $(window).on('scroll', function() {
        headerStyle();
    });

    /* ==========================================================================
       When document is Resized, do
       ========================================================================== */

    $(window).on('resize', function() {
        enableDefaultMasonry();
    });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    $(window).on('load', function() {
        handlePreloader();
        enableDefaultMasonry();
        sortableMasonry();
    });

    let allowTimes = ['01:00', '02:00']
        //Date Time Picker
    if ($('.date-picker').length) {
        $('.date-picker').datetimepicker({
            format: 'Y/m/d',
            formatDate: 'Y/m/d',
            startDate: true,
            timepicker: false,
            datepicker: true,
            minDate: 0,
            onSelectDate: function() {
                changeDate();
            },

        });
    }
    // if ($('.time-picker').length) {
    //     $('.time-picker').datetimepicker({
    //         format: 'H:i',
    //         formatTime: 'H:i',
    //         timepicker: true,
    //         datepicker: false,
    //         minTime: 0,
    //         disabledTimes: ['22:00'],
    //         allowTimes: []
    //     });
    // }
    // Form Start
    let consult = $("#enquiryForm");
    $(consult).submit(function(e) {
        e.preventDefault();
        let consultData = $(consult).serialize();
        $.ajax({
                type: 'POST',
                url: $(consult).attr('action'),
                data: consultData,
                dataType: "json",
            })
            .done(function(data) {
                if (data.sts) {
                    consult[0].reset();
                    Swal.fire({
                        title: "Thank You",
                        text: "In order to confirm your booking, you need to pay AED " + data.amt + ".",
                        icon: "success",
                        confirmButtonText: "Confirm Booking",
                        reverseButtons: true
                    }).then(function(result) {
                        if (result.value) {
                            $('#exampleModal').modal('show');
                            $("#booking_id").val(data.booking_id);
                        } else if (result.dismiss === "cancel") {
                            Swal.fire(
                                "Cancelled",
                                "Your imaginary file is safe :)",
                                "error"
                            )
                        }
                    });
                } else {
                    if (data.validate) {
                        Swal.fire('error!', 'Please Complete Form First', 'error');

                    } else {
                        if (data.exits) {
                            Swal.fire('error!', 'Something Went Wrong, Please Try Later', 'error');
                            $("#hours").val('');
                            $(".date-picker").val('');
                            $("#time_book").html('<option value="">Select</option>');
                        } else {
                            Swal.fire('error!', 'Payment Not Process', 'error');
                        }
                    }
                }
            });
    });

    let conForm = $("#confirmForm");
    $(conForm).submit(function(e) {
        e.preventDefault();
        let confData = $(conForm).serialize();
        $("#bookingBtn").addClass('d-none');
        $("#waitingBtn").removeClass('d-none');
        $.ajax({
            type: 'POST',
            url: $(conForm).attr('action'),
            data: confData,
            dataType: "json",
        }).done(function(data) {
            $("#bookingBtn").removeClass('d-none');
            $("#waitingBtn").addClass('d-none');
            if (data.sts) {
                window.location.href = "/manage/" + data.booking
            } else {
                $('#exampleModal').modal('hide');
                conForm[0].reset();
                Swal.fire('error!', 'Payment Not Process', 'error');
            }
        })
    });
    let linkForm = $("#linkForm");
    $(linkForm).submit(function(e) {
        e.preventDefault();
        let confData = $(linkForm).serialize();
        $("#bookingBtn").addClass('d-none');
        $("#waitingBtn").removeClass('d-none');
        $.ajax({
            type: 'POST',
            url: $(linkForm).attr('action'),
            data: confData,
            dataType: "json",
        }).done(function(data) {
            $("#bookingBtn").removeClass('d-none');
            $("#waitingBtn").addClass('d-none');
            if (data.sts) {
                window.location.href = "/manage-payment/" + data.booking
            } else {
                $('#exampleModal').modal('hide');
                // linkForm[0].reset();
                Swal.fire('error!', 'Payment Not Process', 'error');
            }
        })
    });
})(window.jQuery);


function openModel(params) {
    $('#exampleModal').modal('show');
}
$(document).ready(function() {
    $("#card").inputmask('9999 9999 9999 9999');
    $("#exp_date").inputmask('99/99');
    $("#cvv").inputmask('999');

});

function clickHour() {
    $("#time_book").val('');
}

function changeDate() {
    let yacht = $("#yacht").val();
    let hours = $("#hours").val();
    let date = $(".date-picker").val();
    if (yacht == '' || hours == '' || date == '') {
        $("#time_book").html('<option value="">Select</option>');
    } else {
        $.get("/getTime/" + date + '/' + hours + '/' + yacht, function(data) {
            $("#time_book").html(data);
        });
    }
}

// function serviceDetail(heading, description) {
//     $("#serviceTitle").html(heading);
//     $("#serviceBody").html(description);
//     $('#serviceModal').modal('show');
// }