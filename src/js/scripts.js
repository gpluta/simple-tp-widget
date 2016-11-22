(() => {
  // Model for the current widget
  let data = {};

  let widgetContentTemplate = () => `
    <div class="widget hidden">
      <div class="widget__header">${data.businessUnit.displayName}</div>
      <img class="widget__stars" src="dist/img/${Math.floor(data.businessUnit.stars)}-stars-260x48.png" alt="">
      <div class="widget__details">Trust score: <em>${data.businessUnit.trustScore}</em> <br>
                    based on <em>${data.businessUnit.numberOfReviews.total}</em> reviews</div> 
    </div>
    <div class="see-more">Click for details</div>
  `;

  let renderRecentReviewsList = () => {
    let template = [];
    data.reviews.forEach(review => {
      template.push(`
        <div class="review">
            <img class="review__stars" src="dist/img/${Math.floor(review.stars)}-stars-260x48.png" alt="">
            <div class="review__title">${review.title} </div>
            <div class="review__consumer">by <em>${review.consumer.displayName}</em></div>
            <div class="review__text">${review.text.slice(0, 300) + '...'}</div>
            <div class="review__url"><a href="${review.reviewUrl}" target="_blank">Read the whole review</a></div>
        </div> 
      `);
    });

    return template.join('');
  };

  let modalContentTemplate = () => `
    <div class="blanket">
        <div class="modal">
            <div class="modal__header">
              <div id="closeModal"><span id="closeModal__icon">+</span></div>
              <div class="modal__title">What our customers say about us?</div>
            </div>
            <div class="modal_rev-list">${renderRecentReviewsList()}</div>
            <div class="modal__powered">
                <span>Powered by:</span><a href="http://www.trustpilot.com" target="_blank"><img src="dist/img/trustpilot-logo-light-bg-120x18.png" alt=""></a>
            </div>              
        </div>
    </div>
  `;

  let destroyModalWindow = () => {
    document.getElementById('closeModal').removeEventListener('click', handleModalEvents);
    document.querySelector('.blanket').removeEventListener('click', handleModalEvents);
    document.removeEventListener('keydown', handleModalEvents);

    document.getElementById('modalAnchor').innerHTML = '';
  };

  let handleModalEvents = e => {
    if (e.keyCode === 27 || (e.type === 'click' && (['closeModal', 'closeModal__icon'].includes(e.target.id)  || e.target.classList[0] === 'blanket'))) {
      destroyModalWindow();
    }
  };

  let renderModalWindow = () => {
    document.getElementById('modalAnchor').innerHTML = modalContentTemplate();

    document.getElementById('closeModal').addEventListener('click', handleModalEvents);
    document.querySelector('.blanket').addEventListener('click', handleModalEvents);
    document.addEventListener('keydown', handleModalEvents);
  };

  let renderTrustedButton = () => {
    document.getElementById('widgetAnchor').innerHTML = widgetContentTemplate();
    document.querySelector('.widget').classList.remove('hidden');

    //Attach event handler to newly addedd 'button'
    document.querySelector('#widgetAnchor').addEventListener('click', renderModalWindow)
  };

  let getTrustPilotReviews = url => {
    if (url) {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            console.log(response.statusText);
          }
        })
        .then(resp => {
          data = JSON.parse(resp);
          renderTrustedButton();
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert('please specify api endpoint url');
    }
  };

// Handle click on 'render' button
  document.getElementById('renderFormButton').addEventListener('click', () => {
    getTrustPilotReviews(document.getElementById('endpointUrlInput').value);
  });
})();

