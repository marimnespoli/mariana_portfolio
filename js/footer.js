(function () {
  var footer = document.getElementById('siteFooter');
  if (!footer) return;

  var stageEl = document.getElementById('footerRain');
  var copyBtn = document.getElementById('footerCopyBtn');
  var toastEl = document.getElementById('footerToast');
  var rainBtn = document.getElementById('footerRainBtn');
  var clockEl = document.getElementById('footerClock');

  var EMAIL = 'marimnespoli@gmail.com';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────── Sticker SVGs (same shapes as the hero stickers, inlined) ───────────────────── */
  var SVG_BLUE_STAR =
    '<svg viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M31.7283 33.4597L27.7124 32.2574L23.3709 30.9045L21.1931 32.7822C19.9527 33.8524 18.8944 34.9489 17.6172 35.96C16.5119 36.8369 15.4761 37.7808 14.2992 38.5417C12.9503 39.4104 11.235 38.9913 10.3119 37.7035C9.55454 36.6477 9.2905 35.2663 9.2905 33.9378V27.9891L4.91428 24.793C2.82442 23.2652 -0.0821358 21.7963 -0.000260852 19.5808C0.0304423 18.7528 0.595379 17.7437 1.40594 17.1578C4.36572 15.0237 7.74101 13.7237 11.276 12.5519C11.6567 9.06894 13.2737 3.99304 15.0832 1.34625C17.6192 -2.36658 22.1838 2.41229 24.4681 5.77317L26.5907 8.89601L34.8273 8.6234C35.9428 8.58678 37.2876 8.73529 38.2517 9.09742C41.8583 10.4503 39.1462 15.3553 36.7473 18.1608L34.3586 20.9541L35.9858 24.4207L37.2119 27.0757C38.047 28.8863 38.6263 30.817 37.9242 32.766C37.2221 34.7149 34.2071 34.2002 31.7283 33.4577V33.4597Z" fill="black"/>' +
    '<path d="M35.0715 31.0836L30.5725 29.9687L24.8781 28.1398C23.6009 27.7288 22.514 27.6434 21.3923 28.5426C20.0966 29.5801 18.9115 30.7845 17.6526 31.9238C16.0765 33.3499 14.4943 34.5584 12.691 35.9601C11.8477 32.7111 13.1905 28.0726 11.7331 26.3495C9.56749 23.7902 5.87493 22.0731 3.12598 19.6765C5.9261 17.7316 8.75488 16.5679 11.8641 15.5894C13.1884 15.1723 14.1095 14.1531 14.3285 12.731C14.8423 9.38233 15.8678 6.13945 17.5482 3.08984C18.8112 3.79172 19.5112 4.58922 20.3873 5.56981L21.3206 6.61347L24.2681 10.8349C24.8453 11.6629 25.7971 12.139 26.8226 12.0047L29.9114 11.8684C32.253 11.7646 34.4288 11.6365 36.7663 11.8074C35.4973 13.854 34.4697 15.4978 33.1782 17.2576C32.0503 18.7956 30.1631 19.5138 31.2725 21.7883L33.2682 25.8795L34.4309 28.3961C34.828 29.2546 35.1514 29.8894 35.0756 31.0836H35.0715Z" fill="#2A5AC8"/>' +
    '</svg>';

  var SVG_ORANGE_STAR =
    '<svg viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M31.7283 33.4597L27.7124 32.2574L23.3709 30.9045L21.1931 32.7822C19.9527 33.8524 18.8944 34.9489 17.6172 35.96C16.5119 36.8369 15.4761 37.7808 14.2992 38.5417C12.9503 39.4104 11.235 38.9913 10.3119 37.7035C9.55454 36.6477 9.2905 35.2663 9.2905 33.9378V27.9891L4.91428 24.793C2.82442 23.2652 -0.0821358 21.7963 -0.000260852 19.5808C0.0304423 18.7528 0.595379 17.7437 1.40594 17.1578C4.36572 15.0237 7.74101 13.7237 11.276 12.5519C11.6567 9.06894 13.2737 3.99304 15.0832 1.34625C17.6192 -2.36658 22.1838 2.41229 24.4681 5.77317L26.5907 8.89601L34.8273 8.6234C35.9428 8.58678 37.2876 8.73529 38.2517 9.09742C41.8583 10.4503 39.1462 15.3553 36.7473 18.1608L34.3586 20.9541L35.9858 24.4207L37.2119 27.0757C38.047 28.8863 38.6263 30.817 37.9242 32.766C37.2221 34.7149 34.2071 34.2002 31.7283 33.4577V33.4597Z" fill="black"/>' +
    '<path d="M35.0715 31.0836L30.5725 29.9687L24.8781 28.1398C23.6009 27.7288 22.514 27.6434 21.3923 28.5426C20.0966 29.5801 18.9115 30.7845 17.6526 31.9238C16.0765 33.3499 14.4943 34.5584 12.691 35.9601C11.8477 32.7111 13.1905 28.0726 11.7331 26.3495C9.56749 23.7902 5.87493 22.0731 3.12598 19.6765C5.9261 17.7316 8.75488 16.5679 11.8641 15.5894C13.1884 15.1723 14.1095 14.1531 14.3285 12.731C14.8423 9.38233 15.8678 6.13945 17.5482 3.08984C18.8112 3.79172 19.5112 4.58922 20.3873 5.56981L21.3206 6.61347L24.2681 10.8349C24.8453 11.6629 25.7971 12.139 26.8226 12.0047L29.9114 11.8684C32.253 11.7646 34.4288 11.6365 36.7663 11.8074C35.4973 13.854 34.4697 15.4978 33.1782 17.2576C32.0503 18.7956 30.1631 19.5138 31.2725 21.7883L33.2682 25.8795L34.4309 28.3961C34.828 29.2546 35.1514 29.8894 35.0756 31.0836H35.0715Z" fill="#E8863C"/>' +
    '</svg>';

  var SVG_SMILEY =
    '<svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M18.9615 47.9149C15.051 45.9351 11.822 42.8426 9.74239 38.9979C7.63311 35.0994 6.76007 30.6443 7.25296 26.2394C7.91558 20.3137 11.0559 14.8979 15.8435 11.3484C18.4279 9.4323 21.4347 8.12309 24.5002 7.52379C36.401 5.19614 47.7559 13.0839 49.8808 24.9129C51.9856 36.631 44.0757 47.9433 32.219 49.9087C27.7446 50.6506 23.1316 50.0256 18.9615 47.9149ZM42.5254 43.0819C47.3293 38.4592 49.5649 31.7376 48.3529 25.174C47.905 22.7482 47.0791 20.447 45.8039 18.3448C42.398 12.7307 36.4786 9.16596 29.9223 8.71773C25.5652 8.41949 21.1549 9.61325 17.5243 12.0622C12.4924 15.4567 9.24885 20.9779 8.71086 27.0098C8.48795 29.511 8.79584 31.9526 9.49193 34.368C10.7642 38.7842 13.5151 42.5188 17.2431 45.104C25.025 50.5005 35.6734 49.6743 42.5245 43.0814L42.5254 43.0819Z" fill="#D81928"/>' +
    '<path d="M16.0266 35.2766C16.0708 34.6545 16.7143 34.3482 17.1714 34.3789C18.4433 34.4638 18.0789 35.6143 19.2456 37.0183C20.3272 38.3201 21.4911 39.5044 22.8457 40.5174L24.0765 41.2363C25.0479 41.8035 26.1412 42.0061 27.2764 42.1677C29.5825 42.4952 31.8951 42.2363 34.1524 41.5112C37.517 40.4301 40.2835 37.997 41.9089 34.8954C42.5794 33.6157 42.9687 32.3038 43.0629 30.8722C43.1354 29.7695 43.0122 28.7081 42.8946 27.6082C42.85 27.1872 42.9819 26.7341 43.3294 26.4662C43.6499 26.22 44.1538 26.2606 44.4905 26.4101C44.8681 26.5775 45.154 26.9716 45.2037 27.4321C45.4998 30.1471 45.5022 32.3161 44.4136 34.8778C43.5181 36.9843 42.2488 38.8206 40.5247 40.345C39.0275 41.669 37.3545 42.7171 35.4542 43.4195C32.4167 44.5421 29.1664 44.8469 26.0071 44.2614C22.8436 43.6754 20.9588 42.1735 18.8169 39.9275C17.8503 38.914 16.9942 37.8733 16.3862 36.5946C16.2041 36.2112 15.9944 35.7158 16.0259 35.2768L16.0266 35.2766Z" fill="#D81928"/>' +
    '<path d="M23.7409 33.4539C22.2473 31.4254 21.5521 28.5857 19.216 27.7123C18.5434 27.4611 17.8194 27.3384 17.0886 27.3426L14.5638 27.3568C14.0578 27.3593 13.6446 27.3762 13.096 27.2947L13.7881 26.7989L15.1127 26.0455C15.9336 25.5786 16.7645 25.1547 17.4952 24.5724C18.5845 23.704 19.1328 22.4739 19.1754 21.101C19.2129 19.8826 19.1973 18.7113 19.1621 17.4908C19.1541 17.2155 19.168 16.9712 19.2292 16.6461L21.2286 20.1676C22.2607 21.9845 23.7489 22.7396 25.8199 22.7612L29.6135 22.7189L29.798 22.7937C29.8339 22.8081 29.7259 22.9317 29.6994 22.9645L26.3606 24.8686C24.7948 25.7901 23.7273 27.1529 23.7313 28.9992L23.7411 33.4547L23.7409 33.4539Z" fill="#D81928"/>' +
    '<path d="M38.2652 23.5731C37.223 25.4223 34.8989 26.0659 33.0592 25.1124C31.0527 24.0721 30.3382 21.6689 31.3744 19.7162C32.3898 17.8029 34.8232 17.0707 36.7362 18.124C38.6508 19.1777 39.386 21.5834 38.2644 23.5733L38.2652 23.5731Z" fill="#D81928"/>' +
    '</svg>';

  var SVG_SPARKLE =
    '<svg viewBox="9 46 39 44" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M27.6717 85.293L25.6927 80.1655C24.0891 76.0097 21.1064 72.9397 16.973 71.2292L9 67.9306L16.5772 64.7259C20.2536 63.1705 23.0446 60.5333 24.795 56.9367C26.0232 54.7363 26.9168 52.4461 27.6921 50.0334L28.9896 46C30.3566 50.9805 31.8745 55.3364 34.3471 59.6311L37.5747 62.9215C40.6594 65.3383 44.1318 66.7998 48 68.2817C41.9244 70.3678 36.5709 73.005 33.4291 78.7163C31.6296 82.4966 30.3362 86.1013 29.1896 90L27.6676 85.2889L27.6717 85.293Z" fill="#FFF6A3"/>' +
    '<path d="M29.1338 46.001C30.3176 46.0248 31.0873 46.9808 31.2686 48.2412C31.5768 50.3861 31.9249 52.4312 32.5273 54.5381C34.0689 59.9317 34.7542 62.6588 40.5791 64.4805C45.0906 65.893 47.6061 64.8497 47.9287 67.8242C47.997 68.4497 48.0959 69.2159 47.7734 69.7344C47.5309 70.1266 46.7383 70.5589 46.1807 70.6328C41.323 71.2583 36.1499 72.2602 34.2012 76.8809C32.7115 80.4146 31.8523 84.0742 31.2568 87.8838C31.1062 88.8562 30.4944 89.6529 29.7744 89.8838C28.8048 90.1929 27.5476 89.9148 27.3193 88.8066L26.5264 84.957L26.5312 84.9541L24.2363 77.418C23.8904 76.2813 23.09 74.7857 22.1533 74.1055C19.8658 72.4408 17.317 71.601 14.6553 70.7188L11.0566 70.0527C9.59519 69.7816 8.50779 68.2362 9.23242 66.7832C10.0114 65.2232 12.9085 65.8266 15.9492 64.6162L20 63.002C21.8498 62.2647 23.2197 60.9564 23.8857 59.0254L25.7686 53.5654C27.263 49.2278 26.5097 45.9511 29.1338 46.001ZM28.2461 57.4961C27.7989 58.9016 27.2836 60.2358 26.5752 61.5176C25.5656 63.6127 23.9564 65.1496 21.8359 66.0557L17.4648 67.9219L22.0635 69.8408C24.4476 70.8373 26.1688 72.6259 27.0938 75.0469L28.2344 78.0342H28.2324L29.1104 80.7783C29.7717 78.5096 30.5178 76.4072 31.5557 74.2051C33.3678 70.8781 36.4556 69.3422 39.96 68.127C37.7288 67.2613 35.7255 66.4118 33.9463 65.0039L32.085 63.0869C30.6589 60.5853 29.7835 58.0476 28.9951 55.1465L28.2461 57.4961Z" fill="black" stroke="black"/>' +
    '</svg>';

  var SVG_FLOWER =
    '<svg viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M18.8573 30.8132L16.6497 33.007C16.0368 33.6163 15.2143 33.9934 14.3691 34.3527C12.068 35.3302 9.67125 35.4552 7.29043 34.134C5.54754 33.1655 3.85021 31.1502 3.66794 28.8448C3.48568 26.5395 4.19195 24.6269 5.31059 22.6183C2.36248 21.431 0.560352 19.1123 0.10925 16.2088C-0.592464 11.7052 2.11187 7.96925 6.63428 7.05201C8.42958 6.68824 10.259 6.57888 12.2298 6.75073C12.9224 5.52774 13.5535 4.25342 14.4693 3.17996C17.8002 -0.727793 23.3957 -1.1295 26.6058 2.51937C28.1915 4.32261 28.7884 6.57665 29.5585 8.81731C34.0011 8.58967 38.9177 10.6473 39.804 14.8318C40.836 19.7081 37.6806 22.808 33.1536 24.6648C34.1242 28.6395 33.8394 33.2547 30.2716 35.1629C26.0271 37.4325 21.9991 34.7991 18.8573 30.8154V30.8132Z" fill="black"/>' +
    '<path d="M17.6435 26.5816C15.9142 29.1191 14.0142 31.7258 10.9453 31.728C9.56009 31.728 8.47562 31.0518 7.78074 30.2015C6.25429 28.3358 7.43444 25.4479 8.94723 23.1894C9.28669 22.6828 9.63527 22.0557 9.52819 21.4509C9.26619 19.9735 6.5254 20.3194 4.76656 18.3376C3.39503 16.7933 3.05328 14.3875 3.9965 12.5686C4.5843 11.4371 5.88292 10.9685 7.02207 10.6225C8.76724 10.0914 10.2641 10.0892 12.0617 10.5154C12.6722 10.6605 14.185 10.4775 14.4653 9.93964L16.0327 6.92681C16.8119 5.42709 18.0445 4.02779 19.7031 3.61715C21.5189 3.16635 22.9929 3.68634 24.0341 5.08563C25.0183 6.40681 25.6881 7.80834 25.8772 9.529C25.9889 10.5333 26.7407 12.1446 27.9095 12.1647C30.0101 12.2048 31.9831 12.0352 33.8672 12.8275C35.1317 13.3586 36.1865 14.3384 36.4303 15.4029C36.7561 16.8134 36.5761 18.1301 35.5736 19.2035C32.3339 22.6716 27.7796 20.9488 29.4633 24.7449C30.5249 27.1373 30.648 31.0719 28.6773 32.1877C25.8339 33.8013 22.1431 30.2707 20.6964 27.1016C20.3957 26.4433 19.9833 25.9858 19.3066 25.8474C18.8008 25.7447 17.9875 26.084 17.648 26.5816H17.6435Z" fill="#EAB8EC"/>' +
    '</svg>';

  var SVG_CLOUD =
    '<svg viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M30.2211 39.4165C28.377 41.444 25.8464 42.9474 22.9831 43.0001C17.7702 43.0975 12.5918 39.3007 12.2299 34.003C9.19105 34.685 5.95792 33.7924 3.59228 31.865C1.07229 29.806 0.0584469 26.8649 -9.54165e-05 23.5446C-0.0799259 19.0527 2.41611 15.0031 6.91322 13.6102C6.37836 9.37368 8.50717 5.33988 12.3098 3.26769C14.4812 1.85902 16.9027 1.18759 19.5105 1.4193C21.5994 1.35611 23.5206 1.94591 25.1172 3.38881C29.0875 -1.16107 36.5357 -1.03205 40.6496 3.17553C41.7805 4.33143 42.5629 5.59528 42.9008 7.24883C45.5166 7.02502 47.9062 7.7412 49.862 9.31576C53.0792 11.7829 54.4283 15.5955 53.8722 19.6346C53.4225 22.9022 51.3442 25.5721 48.3027 27.1782C49.4629 30.5933 48.5448 34.2058 46.102 37.01C42.3074 41.3703 34.7129 43.1212 30.2157 39.4139L30.2211 39.4165Z" fill="black"/>' +
    '<path d="M19.6945 40.1011C13.7179 37.6971 14.9951 32.6917 14.282 31.9676C13.4464 31.1224 12.2915 31.5595 11.3602 31.7886C9.02914 32.3678 6.63157 31.4094 4.95246 29.9797C3.13765 28.4341 2.49901 26.2724 2.40853 23.7921C2.28879 20.4745 3.90668 17.2806 7.27287 16.1458C8.07118 15.8772 9.32185 15.3242 9.44692 14.3632C8.4517 10.9376 9.81148 7.70953 12.704 5.74002C15.1042 4.10754 17.8105 3.3387 20.7802 3.889C23.1751 4.33398 24.4205 6.70634 25.8414 5.99806C26.6264 5.60574 28.7074 0.842587 35.5089 2.70941C38.3189 3.56777 40.4105 5.6426 40.666 8.58369L41.7543 9.64217C42.0337 9.91601 42.9039 9.51315 43.2897 9.47629C46.8182 9.1498 49.7187 11.43 51.0014 14.5343C52.7603 18.7919 50.8869 23.4972 46.5388 25.2797C45.847 25.5641 45.2323 26.4435 45.682 27.1071C46.6692 28.5684 46.8236 30.0245 46.3659 31.6833C44.4712 38.5423 35.8575 40.5987 32.3742 37.9235C31.5413 37.2837 30.3758 36.2911 29.2608 36.8256C27.2704 40.1195 23.4306 41.5992 19.6945 40.0958V40.1011Z" fill="#E2F5B5"/>' +
    '</svg>';

  var STICKER_TYPES = [
    { svg: SVG_BLUE_STAR,   w: 40, h: 39 },
    { svg: SVG_ORANGE_STAR, w: 40, h: 39 },
    { svg: SVG_SMILEY,      w: 58, h: 58 },
    { svg: SVG_SPARKLE,     w: 39, h: 44 },
    { svg: SVG_FLOWER,      w: 40, h: 36 },
    { svg: SVG_CLOUD,       w: 54, h: 43 }
  ];

  function buildSticker(type, size) {
    var scale = size / Math.max(type.w, type.h);
    var w = Math.round(type.w * scale);
    var h = Math.round(type.h * scale);
    var wrap = document.createElement('div');
    wrap.innerHTML = type.svg;
    var svg = wrap.firstElementChild;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.classList.add('ft-sticker');
    return { el: svg, w: w, h: h };
  }

  /* ───────────────────────── Clock ───────────────────────── */
  var timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Toronto' });
  var hourFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Toronto' });

  function statusFor(hour24) {
    if (hour24 >= 6 && hour24 < 11) return 'having coffee';
    if (hour24 >= 11 && hour24 < 18) return 'designing';
    if (hour24 >= 18 && hour24 < 24) return 'probably coding';
    return 'asleep (or coding)';
  }

  function updateClock() {
    var now = new Date();
    var hour24 = parseInt(hourFmt.format(now), 10) % 24;
    clockEl.textContent = timeFmt.format(now) + ' in Toronto · ' + statusFor(hour24);
  }
  updateClock();
  setInterval(updateClock, 20000);

  /* ───────────────────── Copy email + burst ───────────────────── */
  var toastTimer = null;

  function burst(originEl) {
    var originRect = originEl.getBoundingClientRect();
    var footerRect = footer.getBoundingClientRect();
    var cx = Math.round(originRect.left + originRect.width / 2 - footerRect.left);
    var cy = Math.round(originRect.top + originRect.height / 2 - footerRect.top);
    var count = 8;

    for (var i = 0; i < count; i++) {
      (function (i) {
        var type = STICKER_TYPES[i % STICKER_TYPES.length];
        var s = buildSticker(type, 28);
        s.el.classList.remove('ft-sticker');
        s.el.classList.add('ft-burst');
        s.el.style.left = cx + 'px';
        s.el.style.top = cy + 'px';
        stageEl.parentNode.insertBefore(s.el, stageEl.nextSibling);
        s.el.style.position = 'absolute';

        var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        var dist = 60 + Math.random() * 40;
        var dx = Math.round(Math.cos(angle) * dist);
        var dy = Math.round(Math.sin(angle) * dist);
        var rot = Math.round(Math.random() * 360 - 180);

        requestAnimationFrame(function () {
          s.el.style.transition = 'transform 0.8s cubic-bezier(.17,.67,.5,1), opacity 0.8s ease';
          s.el.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) rotate(' + rot + 'deg)';
          s.el.style.opacity = '0';
        });
        setTimeout(function () { s.el.remove(); }, 850);
      })(i);
    }
  }

  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).catch(function () {});
    }
    toastEl.textContent = 'Email copied ✓ ' + EMAIL;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2000);
    if (!prefersReducedMotion) burst(copyBtn);
  });

  /* ───────────────────── Sticker rain physics ───────────────────── */
  var items = [];
  var rafId = null;

  function isMobile() { return window.innerWidth <= 700; }

  function render(it) {
    var x = Math.round(it.x), y = Math.round(it.y), r = Math.round(it.rot);
    it.el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) rotate(' + r + 'deg)';
  }

  function attachDrag(item) {
    item.el.addEventListener('pointerdown', function (e) {
      item.dragging = true;
      item.el.setPointerCapture(e.pointerId);
      var lastX = e.clientX, lastY = e.clientY, lastT = performance.now();
      item.vx = 0; item.vy = 0;

      var MAX_V = 40;
      function move(ev) {
        var now = performance.now();
        var dt = Math.max(8, now - lastT);
        var dxp = ev.clientX - lastX, dyp = ev.clientY - lastY;
        item.x += dxp;
        item.y += dyp;
        item.vx = Math.max(-MAX_V, Math.min(MAX_V, (dxp / dt) * 16));
        item.vy = Math.max(-MAX_V, Math.min(MAX_V, (dyp / dt) * 16));
        lastX = ev.clientX; lastY = ev.clientY; lastT = now;
        render(item);
        startLoop();
      }
      function up() {
        item.dragging = false;
        try { item.el.releasePointerCapture(e.pointerId); } catch (err) {}
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
        startLoop();
      }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
    });
  }

  function spawnStickers() {
    items.forEach(function (it) { it.el.remove(); });
    items = [];

    var rect = stageEl.getBoundingClientRect();
    var mobile = isMobile();
    var repeats = mobile ? 1 : 2;

    var order = [];
    for (var rep = 0; rep < repeats; rep++) {
      for (var t = 0; t < STICKER_TYPES.length; t++) order.push(t);
    }

    order.forEach(function (typeIndex) {
      // Same size as the hero stickers (each SVG's natural size)
      var type = STICKER_TYPES[typeIndex];
      var s = buildSticker(type, Math.max(type.w, type.h));
      stageEl.appendChild(s.el);

      var maxDim = Math.max(s.w, s.h);
      var item = {
        el: s.el,
        w: s.w,
        h: s.h,
        size: maxDim,
        r: maxDim / 2,
        x: Math.random() * Math.max(1, rect.width - s.w),
        y: -s.h - Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 4,
        dragging: false
      };
      items.push(item);
      attachDrag(item);
      render(item);
    });

    if (prefersReducedMotion) {
      var floorW = rect.width;
      var xCursor = 8;
      items.forEach(function (it) {
        if (xCursor + it.w > floorW) xCursor = 8;
        it.x = xCursor;
        xCursor += it.w * 0.7;
        it.y = rect.height - it.h;
        render(it);
      });
      return;
    }

    startLoop();
  }

  function startLoop() {
    if (rafId) return;
    rafId = requestAnimationFrame(tick);
  }

  function tick() {
    var rect = stageEl.getBoundingClientRect();
    var width = rect.width;
    var gravity = 0.55;
    var airFriction = 0.995;
    var restitution = 0.42;

    items.forEach(function (it) {
      if (it.dragging) return;

      it.vy += gravity;
      it.vx *= airFriction;
      it.vy *= airFriction;
      it.x += it.vx;
      it.y += it.vy;
      it.rot += it.vrot;

      var floorY = rect.height - it.h;
      if (it.y > floorY) {
        it.y = floorY;
        it.vy = -it.vy * restitution;
        it.vrot *= 0.7;
        if (Math.abs(it.vy) < 0.6) it.vy = 0;
      }
      if (it.x < 0) { it.x = 0; it.vx = -it.vx * restitution; }
      if (it.x + it.w > width) { it.x = width - it.w; it.vx = -it.vx * restitution; }
    });

    for (var i = 0; i < items.length; i++) {
      for (var j = i + 1; j < items.length; j++) {
        var a = items[i], b = items[j];
        if (a.dragging || b.dragging) continue;
        var acx = a.x + a.r, acy = a.y + a.r, bcx = b.x + b.r, bcy = b.y + b.r;
        var dx = bcx - acx, dy = bcy - acy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var minDist = a.r + b.r;
        if (dist > 0 && dist < minDist) {
          var overlap = (minDist - dist) / 2;
          var nx = dx / dist, ny = dy / dist;
          a.x -= nx * overlap; a.y -= ny * overlap;
          b.x += nx * overlap; b.y += ny * overlap;
          var avx = a.vx, avy = a.vy;
          a.vx = b.vx * 0.9; a.vy = b.vy * 0.9;
          b.vx = avx * 0.9; b.vy = avy * 0.9;
        }
      }
    }

    // An item only counts as "at rest" once it's actually resting on the
    // floor with low velocity — never while still airborne, even if a
    // collision this frame happened to damp its velocity near zero.
    var anyMoving = false;
    items.forEach(function (it) {
      if (it.dragging) { anyMoving = true; return; }
      var floorY = rect.height - it.h;
      var onFloor = it.y >= floorY - 0.5;
      if (!onFloor || Math.abs(it.vy) > 0.6 || Math.abs(it.vx) > 0.05) anyMoving = true;
    });

    items.forEach(render);

    if (anyMoving) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  /* ───────────────────── Trigger on first view ───────────────────── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          spawnStickers();
          io.unobserve(footer);
        }
      });
    }, { threshold: 0.2 });
    io.observe(footer);
  } else {
    spawnStickers();
  }

  rainBtn.addEventListener('click', function () {
    if (prefersReducedMotion || items.length === 0) return;
    var rect = stageEl.getBoundingClientRect();
    items.forEach(function (it) {
      it.x = Math.random() * Math.max(1, rect.width - it.w);
      it.y = -it.h - Math.random() * 200;
      it.vx = (Math.random() - 0.5) * 2;
      it.vy = 0;
    });
    startLoop();
  });
})();
