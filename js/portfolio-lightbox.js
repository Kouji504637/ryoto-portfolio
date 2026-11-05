(() => {
  const styles = document.createElement('style');
  styles.textContent = `.image-lightbox{position:fixed;inset:0;margin:0;width:100vw;height:100vh;height:100dvh;max-width:none;max-height:none;box-sizing:border-box;padding:20px;border:0;background:transparent;color:#252620;overflow:auto;place-items:center}.image-lightbox[open]{display:grid}.image-lightbox::backdrop{background:rgba(20,21,18,.82);backdrop-filter:blur(2px)}.image-lightbox figure{position:relative;margin:0;display:grid;justify-items:center;max-width:92vw}.image-lightbox img{display:block;width:auto;height:auto;max-width:92vw;max-height:84vh;max-height:84dvh;object-fit:contain;background:#fff}.image-lightbox figcaption{width:100%;box-sizing:border-box;padding:9px 12px;background:#fff;text-align:left;font-size:12px;line-height:1.5;color:#45453f}.image-lightbox-close{position:fixed;right:20px;top:20px;z-index:1;width:42px;height:42px;border:1px solid rgba(255,255,255,.7);border-radius:50%;background:rgba(24,25,22,.55);color:#fff;font-size:25px;line-height:1;cursor:pointer;backdrop-filter:blur(5px)}#works .card img,.character-card img,.place-photos img,.award-feature img{cursor:zoom-in}@media(max-width:600px){.image-lightbox{padding:12px}.image-lightbox figure{max-width:96vw}.image-lightbox img{max-width:96vw;max-height:82vh;max-height:82dvh}.image-lightbox-close{right:12px;top:12px}}`;
  document.head.append(styles);
  const images = document.querySelectorAll('#works .card img, .character-card img, .place-photos img, .award-feature img');
  if (!images.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox';
  dialog.setAttribute('aria-label', '拡大画像');
  dialog.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="閉じる">×</button><figure><img><figcaption></figcaption></figure>';
  document.body.append(dialog);

  const preview = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const closeButton = dialog.querySelector('button');

  function close() { dialog.close(); }
  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });

  images.forEach(image => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || '作品画像'}を拡大`);
    image.addEventListener('click', () => {
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt || '作品画像';
      caption.textContent = image.alt || '';
      dialog.showModal();
      closeButton.focus();
    });
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        image.click();
      }
    });
  });
})();
