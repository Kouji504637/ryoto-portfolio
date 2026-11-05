(() => {
  const styles = document.createElement('style');
  styles.textContent = `.image-lightbox{width:min(92vw,1120px);max-width:none;max-height:92vh;padding:18px;border:0;background:#252620;color:#f5f4f0;overflow:visible}.image-lightbox::backdrop{background:rgba(20,21,18,.84);backdrop-filter:blur(3px)}.image-lightbox figure{margin:0}.image-lightbox img{display:block;width:100%;height:min(78vh,850px);object-fit:contain}.image-lightbox figcaption{padding:8px 2px 0;font-size:10px;color:#d1d0c8}.image-lightbox-close{position:absolute;right:8px;top:8px;z-index:1;width:38px;height:38px;border:1px solid #77786e;border-radius:50%;background:#252620;color:#fff;font-size:24px;line-height:1;cursor:pointer}#works .card img,.character-card img,.place-photos img,.award-feature img{cursor:zoom-in}`;
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
