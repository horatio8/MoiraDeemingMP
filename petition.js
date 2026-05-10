/* Shared renderer + form handler for petition pages.
   Each page sets window.PETITION_SLUG to the JSON filename (without .json).
   Content lives in /content/<slug>.json — edit via the CMS at /admin/. */

(function () {
  var slug = window.PETITION_SLUG;
  if (!slug) { console.error('window.PETITION_SLUG is not set'); return; }

  var counter = 0;
  var counterEls = [];

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function render(c) {
    document.title = c.title || 'Petition';

    // Hero
    var eyebrow = document.querySelector('[data-bind="eyebrow"]');
    if (eyebrow) {
      eyebrow.textContent = c.eyebrow || '';
      if (c.eyebrowSize) {
        eyebrow.style.fontSize = c.eyebrowSize + 'px';
        // scale padding proportionally to keep the pill balanced
        var scale = c.eyebrowSize / 11;
        eyebrow.style.padding = (7 * scale).toFixed(0) + 'px ' + (14 * scale).toFixed(0) + 'px';
      }
    }

    var h1 = document.querySelector('[data-bind="headline"]');
    if (h1) {
      var hl = c.headline || {};
      var parts = [];
      if (hl.before) parts.push(escapeHtml(hl.before));
      if (hl.highlight) parts.push('<span class="gold-word">' + escapeHtml(hl.highlight) + '</span>');
      if (hl.after) parts.push(escapeHtml(hl.after));
      h1.innerHTML = parts.join(' ');
    }

    var lede = document.querySelector('[data-bind="lede"]');
    if (lede) lede.textContent = c.lede || '';

    // Photo: real image if photoUrl set, else placeholder caption
    var photoEl = document.querySelector('.hero-photo');
    var photoTag = document.querySelector('[data-bind="photoCaption"]');
    if (c.photoUrl) {
      if (photoEl) photoEl.classList.add('has-image');
      if (photoEl) photoEl.style.backgroundImage =
        'linear-gradient(rgba(0,0,0,0) 60%, rgba(0,0,0,0.35)), url(' + JSON.stringify(c.photoUrl).slice(1, -1) + ')';
      if (photoTag) photoTag.style.display = 'none';
    } else {
      if (photoTag) photoTag.textContent = c.photoCaption || '';
    }

    // Stats — N stats from content + 1 live signature counter
    var statsEl = document.querySelector('[data-bind="stats"]');
    if (statsEl) {
      var statsHtml = (c.stats || []).map(function (s) {
        return '<div class="stat">' +
          '<div class="num">' + escapeHtml(s.num) + '</div>' +
          '<div class="lbl">' + escapeHtml(s.label) + '</div>' +
          (s.source ? '<div class="src">' + escapeHtml(s.source) + '</div>' : '') +
          '</div>';
      }).join('');
      statsHtml += '<div class="stat">' +
        '<div class="num" id="stat-sigs">' + counter.toLocaleString() + '</div>' +
        '<div class="lbl">Victorians Signed</div>' +
        '<div class="src">Live counter</div>' +
        '</div>';
      statsEl.innerHTML = statsHtml;
    }

    // Argument
    var arg = c.argument || {};
    var setText = function (sel, val) {
      var el = document.querySelector(sel);
      if (el) el.textContent = val || '';
    };
    setText('[data-bind="argSectionLabel"]', arg.sectionLabel);
    setText('[data-bind="argH2"]', arg.h2);
    setText('[data-bind="argLede"]', arg.lede);
    setText('[data-bind="argBody"]', arg.body);
    setText('[data-bind="argQuote"]', arg.quote);
    setText('[data-bind="argQuoteCite"]', arg.quoteCite);
    setText('[data-bind="argPlanHeading"]', arg.planHeading);

    // Why-it-matters section: hide entirely when both fields are empty
    var whyHEl = document.querySelector('[data-bind="argWhyHeading"]');
    var whyBEl = document.querySelector('[data-bind="argWhyBody"]');
    if (arg.whyHeading || arg.whyBody) {
      if (whyHEl) whyHEl.textContent = arg.whyHeading || '';
      if (whyBEl) whyBEl.textContent = arg.whyBody || '';
    } else {
      if (whyHEl) whyHEl.style.display = 'none';
      if (whyBEl) whyBEl.style.display = 'none';
    }

    var planEl = document.querySelector('[data-bind="argPlan"]');
    if (planEl) {
      planEl.innerHTML = (arg.plan || []).map(function (item, i) {
        return '<li><span class="marker">' + (i + 1) + '</span><span>' + escapeHtml(item) + '</span></li>';
      }).join('');
    }

    var sourcesEl = document.querySelector('[data-bind="sources"]');
    if (sourcesEl) {
      sourcesEl.innerHTML = (c.sources || []).map(function (s) {
        var label = s.url ? s.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
        return '<li>' + escapeHtml(s.text) +
          (s.url ? ' <a href="' + escapeHtml(s.url) + '" target="_blank" rel="noopener">' + escapeHtml(label) + '</a>' : '') +
          '</li>';
      }).join('');
    }

    // Petition card
    var pet = c.petition || {};
    setText('[data-bind="petH2"]', pet.h2);
    setText('[data-bind="petLede"]', pet.lede);
    var submitBtn = document.querySelector('[data-bind="petSubmit"]');
    if (submitBtn) submitBtn.textContent = pet.submitLabel || 'Sign';
    setText('[data-bind="petSuccessHeading"]', pet.successHeading);
    setText('[data-bind="petSuccessBody"]', pet.successBody);

    var pcInput = document.getElementById('f-postcode');
    if (pcInput && pet.postcodePlaceholder) pcInput.placeholder = pet.postcodePlaceholder;

    // VEC line
    setText('[data-bind="vec"]', c.vec);

    // Counter init
    counter = (pet.initialCount != null) ? pet.initialCount : 0;
    counterEls = [
      document.getElementById('stat-sigs'),
      document.getElementById('form-counter'),
    ];
    counterEls.forEach(function (el) { if (el) el.textContent = counter.toLocaleString(); });

    // Live ticker
    setInterval(function () {
      counter += Math.floor(Math.random() * 3) + 1;
      counterEls.forEach(function (el) { if (el) el.textContent = counter.toLocaleString(); });
    }, 5000);

    // Wire form
    wireForm(pet, c);
  }

  function showErr(id, on) {
    var e = document.getElementById('e-' + id);
    var f = document.getElementById('f-' + id);
    if (e) e.style.display = on ? 'block' : 'none';
    if (f) f.classList.toggle('error', on);
  }

  function wireForm(pet, c) {
    var form = document.getElementById('pet-form');
    if (!form) return;

    var submitBtn = document.getElementById('f-submit');
    var fail = document.getElementById('fail-msg');
    var postI = document.getElementById('f-postcode');
    if (postI) {
      postI.addEventListener('input', function () {
        postI.value = postI.value.replace(/\D/g, '').slice(0, 4);
      });
    }

    var receiver = (pet && pet.receiverUrl) || '';
    var originalLabel = submitBtn ? submitBtn.textContent : 'Sign';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (fail) fail.style.display = 'none';

      var first = (document.getElementById('f-first').value || '').trim();
      var last = (document.getElementById('f-last').value || '').trim();
      var email = (document.getElementById('f-email').value || '').trim();

      var ok = true;
      if (!first) { showErr('first', true); ok = false; } else showErr('first', false);
      if (!last) { showErr('last', true); ok = false; } else showErr('last', false);
      if (!/.+@.+\..+/.test(email)) { showErr('email', true); ok = false; } else showErr('email', false);
      if (!ok) return;

      if (!receiver) {
        if (fail) {
          fail.textContent = 'Form receiver URL is not configured. Please add it in the CMS.';
          fail.style.display = 'block';
        }
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';
      var fd = new FormData(form);

      fetch(receiver, { method: 'POST', body: fd, mode: 'no-cors' })
        .then(function () {
          var wrap = document.getElementById('petition-form-wrap');
          var thanks = document.getElementById('petition-thanks');
          if (wrap) wrap.style.display = 'none';
          if (thanks) thanks.style.display = 'block';
          var nameEl = document.getElementById('thanks-name');
          if (nameEl) nameEl.textContent = 'Thank you, ' + (first || 'friend') + '.';
          counter += 1;
          counterEls.forEach(function (el) { if (el) el.textContent = counter.toLocaleString(); });
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          if (fail) fail.style.display = 'block';
        });
    });

    // Canonical share URL (e.g. www.moiradeeming.com/...) so links work even
    // when the page is being viewed via a Vercel preview alias.
    var url = c.shareUrl || location.href;
    var shareText = (c.petition && c.petition.shareText) || c.title || '';
    var emailSubject = shareText || (c.title || 'Sign this petition');
    var emailBody = (shareText ? shareText + '\n\n' : '') + url;

    var toastEl = document.getElementById('share-toast');
    function toast(msg) {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
    }

    function open_(href) { window.open(href, '_blank', 'noopener'); }

    var fbBtn = document.getElementById('share-fb');
    if (fbBtn) fbBtn.addEventListener('click', function () {
      open_('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
    });

    var xBtn = document.getElementById('share-x');
    if (xBtn) xBtn.addEventListener('click', function () {
      open_('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(shareText));
    });

    var igBtn = document.getElementById('share-ig');
    if (igBtn) igBtn.addEventListener('click', async function () {
      var data = { title: c.title, text: shareText, url: url };
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        try { await navigator.share(data); return; } catch (err) { /* fall through to copy */ }
      }
      try {
        if (navigator.clipboard) await navigator.clipboard.writeText(url);
        toast('Link copied — paste it in your Instagram bio or story.');
      } catch (err) {
        toast('Copy this link, then paste into Instagram: ' + url);
      }
    });

    var waBtn = document.getElementById('share-wa');
    if (waBtn) waBtn.addEventListener('click', function () {
      open_('https://wa.me/?text=' + encodeURIComponent((shareText ? shareText + ' ' : '') + url));
    });

    var smsBtn = document.getElementById('share-sms');
    if (smsBtn) smsBtn.addEventListener('click', function () {
      var body = (shareText ? shareText + ' ' : '') + url;
      // sms:?&body=… is the most universally accepted form across iOS + Android
      window.location.href = 'sms:?&body=' + encodeURIComponent(body);
    });

    var emBtn = document.getElementById('share-email');
    if (emBtn) emBtn.addEventListener('click', function () {
      window.location.href =
        'mailto:?subject=' + encodeURIComponent(emailSubject) +
        '&body=' + encodeURIComponent(emailBody);
    });

    var copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async function () {
        try {
          if (navigator.clipboard) await navigator.clipboard.writeText(url);
          toast('Link copied to clipboard.');
        } catch (err) {
          toast('Couldn\'t copy. Select the URL bar and copy manually.');
        }
      });
    }
  }

  fetch('/content/' + slug + '.json', { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('content load failed');
      return r.json();
    })
    .then(render)
    .catch(function (err) {
      console.error(err);
      var msg = document.createElement('div');
      msg.style.cssText = 'padding:24px;background:#fef0ef;color:#c0392b;font-family:sans-serif;text-align:center';
      msg.textContent = 'Failed to load petition content.';
      document.body.prepend(msg);
    });
})();
