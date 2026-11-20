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

  /* Problem hold: a month with an agency */
  var gapEl = $('#gap'), tlRows = $$('#tl div'), gday = $('#gday'), gads = $('#gads'), ginv = $('#ginv'), glabel = $('#glabel');
  var GDAY = [1, 3, 10, 17, 30];
  var HEAT = [['Retainer paid', '#e0a21a'], ['In the queue', '#e0a21a'], ['Still waiting', '#e07a2a'], ['Live, a week late', '#de6030'], ['Invoiced again', '#d9483b']];
  function gap(p) {
    var x = Math.min(4.999, p * 5), st = Math.floor(x), f = x - st;
    var day = st < 4 ? GDAY[st] + (GDAY[st + 1] - GDAY[st]) * f * .8 : 30;
    gday.textContent = ('0' + Math.round(day)).slice(-2);
    gads.textContent = st >= 3 ? '1' : '0';
    ginv.textContent = st >= 4 ? '2' : '1';
    glabel.textContent = HEAT[st][0];
    gapEl.style.setProperty('--heat', HEAT[st][1]);
    tlRows.forEach(function (r, k) { r.classList.toggle('on', k <= st); r.classList.toggle('cur', k === st); });
  }

  /* Features hold */
  var fbtns = $$('#flist .fbtn'), fpanels = $$('#fstage .fpanel'), fcount = $('#fcount'), fcur = -1;
  function feat(p) {
    var i = Math.min(fpanels.length - 1, Math.floor(p * fpanels.length));
    if (i === fcur) return; fcur = i;
    fbtns.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    fpanels.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    fcount.textContent = ('0' + (i + 1)).slice(-2) + ' / ' + ('0' + fpanels.length).slice(-2) + ' · ' + fbtns[i].lastChild.textContent;
  }
  fbtns.forEach(function (b, k) {
    b.addEventListener('click', function () {
      var h = $('#how'), range = h.offsetHeight - w.innerHeight;
      if (reduced || range <= 0) return;
      w.scrollTo({ top: h.getBoundingClientRect().top + w.pageYOffset + range * (k + .5) / fbtns.length, behavior: 'smooth' });
    });
  });

  var H = { gap: gap, feat: feat };
  var holds = $$('[data-hold]');

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
    stages.forEach(function (s) { s.classList.add('on'); });
    gap(1); tlRows.forEach(function (r) { r.classList.remove('cur'); });
    gapEl.style.setProperty('--p', 1);
    fpanels.forEach(function (s) { s.classList.add('on'); });
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
