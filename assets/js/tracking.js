
(function(){
  'use strict';
 
  window.dataLayer = window.dataLayer || [];

 
  function setupNavClicks(){
    var links = document.querySelectorAll('a[data-section], nav a');
    links.forEach(function(a){
      a.addEventListener('click', function(e){
        // allow normal anchor smooth scroll behavior but also track
        var sectionName = this.dataset.section || this.getAttribute('href').replace('#','');
    
        window.dataLayer.push({
          event: 'nav_click',
          section_name: sectionName
        });
        console.log('DL: nav_click ->', sectionName);
      });
    });
  }


  function setupScrollDepth(){
    var milestones = [25,50,75,100];
    var fired = new Set();
    var ticking = false;

    function checkScroll(){
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var percent = (docHeight > 0) ? Math.round((scrollTop / docHeight) * 100) : 100;

      milestones.forEach(function(m){
        if(percent >= m && !fired.has(m)){
          fired.add(m);
          window.dataLayer.push({
            event: 'scroll_depth',
            scroll_percent: m
          });
          console.log('DL: scroll_depth ->', m);
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function(){
      if(!ticking){
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    }, {passive:true});
  }

  function setupCTA(){
    var ctas = document.querySelectorAll('[data-cta]');
    ctas.forEach(function(btn){
      btn.addEventListener('click', function(e){
        var ctaLabel = this.dataset.cta || this.textContent.trim();
        window.dataLayer.push({
          event: 'cta_click',
          cta_label: ctaLabel
        });
        console.log('DL: cta_click ->', ctaLabel);
      });
    });
  }

  
  function setupOutboundLinks(){
    var outs = document.querySelectorAll('a[data-outbound]');
    outs.forEach(function(a){
      a.addEventListener('click', function(e){
        var url = this.dataset.outbound || this.href;
        window.dataLayer.push({
          event: 'outbound_click',
          outbound_url: url
        });
        console.log('DL: outbound_click ->', url);
      });
    });
  }

 
  function setupContactForm(){
    var form = document.getElementById('contactForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
     
      var messageLen = (form.message && form.message.value) ? form.message.value.length : 0;
      window.dataLayer.push({
        event: 'contact_submit',
        msg_length: messageLen
      });
      console.log('DL: contact_submit -> length', messageLen);
      
      alert('Thank you! Message recorded for demo purposes.');
      form.reset();
    });
  }

 
  document.addEventListener('DOMContentLoaded', function(){
    setupNavClicks();
    setupScrollDepth();
    setupCTA();
    setupOutboundLinks();
    setupContactForm();
  });
})();
