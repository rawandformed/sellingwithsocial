  var d = document, w = window;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var reduced = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Links from config */
  if (SWS.CHECKOUT_URL) $$('.buy').forEach(function (a) { a.href = SWS.CHECKOUT_URL; });
  if (SWS.WEBINAR_URL) $$('.web').forEach(function (a) { a.href = SWS.WEBINAR_URL; });

  /* Cost calculator */
  var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var ret = $('#c-ret'), spend = $('#c-spend'), fee = $('#c-fee');
  function fill(el) { el.style.setProperty('--fill', ((el.value - el.min) / (el.max - el.min) * 100) + '%'); }
  function calc() {
    var r = +ret.value, s = +spend.value, f = +fee.value;
    var yr = r * 12, cut = s * f / 100 * 12, total = yr + cut, us = 297 * 12;
    $('#o-ret').textContent = money(r);
    $('#o-spend').textContent = money(s);
    $('#o-fee').textContent = f + '%';
    $('#b-ret').textContent = money(yr);
    $('#b-fee').textContent = money(cut);
    $('#b-total').textContent = money(total);
    $('#b-keep').textContent = money(Math.max(0, total - us));
    [ret, spend, fee].forEach(fill);
  }
  if (ret) { [ret, spend, fee].forEach(function (el) { el.addEventListener('input', calc); }); calc(); }

  /* Launcher */
  var steps = $$('#lsteps .lstep'), scrs = $$('#launcher .scr');
  var lstat = $('#lstat'), lcap = $('#lcap'), pick = $('#pick'), lbar = $('#lbar'), lgo = $('#lgo'), ltoast = $('#ltoast');
  var cur = -1;
  function launcher(p) {
    var x = Math.min(3.999, p * 4), i = Math.floor(x), local = x - i;
    if (i !== cur) {
      cur = i;
      steps.forEach(function (s, k) { s.classList.toggle('on', k === i); s.setAttribute('aria-current', k === i ? 'step' : 'false'); });
      scrs.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      if (lcap) {
        lcap.firstElementChild.textContent = $('b', steps[i]).textContent;
        lcap.lastElementChild.textContent = $('.d', steps[i]).textContent;
      }
    }
    var picked = i > 2 || (i === 2 && local > .4);
    pick.classList.toggle('pick', picked);
    $('.tag', pick).hidden = !picked;
    var live = i === 3 && local > .4;
    lbar.classList.toggle('live', live);
    lgo.textContent = live ? 'Live' : 'Launch';
    ltoast.classList.toggle('in', i === 3 && local > .68);
    lstat.textContent = live ? 'Live' : 'Step ' + (i + 1) + ' of 4';
    lstat.className = 'tag' + (live ? ' g' : '');
  }
  var H = { launcher: launcher };
  var holds = $$('[data-hold]');

  steps.forEach(function (b, k) {
    b.addEventListener('click', function () {
      var h = $('#launcher');
      var range = h.offsetHeight - w.innerHeight;
      if (reduced || range <= 0) return;
      w.scrollTo({ top: h.getBoundingClientRect().top + w.pageYOffset + range * (k + .5) / 4, behavior: 'smooth' });
    });
  });

  /* Signal pipeline, curtains, nav, mobile bar */
  var stages = $$('#pipe .stage'), pipe = $('#pipe');
  var curtains = $$('[data-curtain]'), darks = $$('.dark');
  var nav = $('#nav'), mbar = $('#mbar'), hero = $('#hero'), plan = $('#plan'), foot = $('.foot');

  function frame() {
    var vh = w.innerHeight, inHold = false;
    holds.forEach(function (h) {
      var r = h.getBoundingClientRect(), range = r.height - vh;
      var p = range > 0 ? clamp(-r.top / range) : 0;
      h.style.setProperty('--p', p.toFixed(4));
      if (r.top <= 0 && r.bottom >= vh) inHold = true;
      var fn = H[h.getAttribute('data-hold')];
      if (fn) fn(p);
    });
    curtains.forEach(function (c) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--e', clamp((vh - r.top) / (vh * .7)).toFixed(4));
    });
    if (pipe) {
      var pr = pipe.getBoundingClientRect();
      var q = clamp((vh * .8 - pr.top) / (vh * .45));
      var n = Math.min(stages.length, 1 + Math.floor(q * stages.length));
      stages.forEach(function (s, k) { s.classList.toggle('on', k < n); });
    }
    var nr = nav.getBoundingClientRect(), mid = nr.top + nr.height / 2;
    nav.classList.toggle('on-dark', darks.some(function (s) { var r = s.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; }));
    if (mbar) {
      var pastHero = hero.getBoundingClientRect().bottom < 80;
      var planR = plan.getBoundingClientRect(), planIn = planR.top < vh && planR.bottom > 0;
      var footIn = foot && foot.getBoundingClientRect().top < vh;
      var show = pastHero && !inHold && !planIn && !footIn;
      mbar.classList.toggle('show', show);
      mbar.setAttribute('aria-hidden', show ? 'false' : 'true');
      $('a', mbar).tabIndex = show ? 0 : -1;
    }
  }

  if (reduced) {
    /* No holds: every screen is laid out in the page, shown in its finished state. */
    scrs.forEach(function (s) { s.classList.add('on'); });
    steps.forEach(function (s) { s.classList.add('on'); });
    pick.classList.add('pick'); $('.tag', pick).hidden = false;
    lbar.classList.add('live'); lgo.textContent = 'Live'; ltoast.classList.add('in');
    lstat.textContent = '4 steps';
    stages.forEach(function (s) { s.classList.add('on'); });
    H = {};
    holds = [];
    pipe = null;
  }

  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; w.requestAnimationFrame(function () { ticking = false; frame(); }); } }
  w.addEventListener('scroll', onScroll, { passive: true });
  w.addEventListener('resize', onScroll);
  frame();

  /* Reveal */
  var rv = $$('.rv');
  if ('IntersectionObserver' in w && !reduced) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });
