const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseenter', function() {
    const value = parseInt(this.getAttribute('data-value'));
    highlightStars(value);
  });

  star.addEventListener('click', function() {
    selectedRating = parseInt(this.getAttribute('data-value'));
    ratingInput.value = selectedRating;
    stars.forEach(s => s.classList.add('selected'));
  });
});

document.getElementById('starRating').addEventListener('mouseleave', function() {
  if (selectedRating > 0) {
    highlightStars(selectedRating);
  } else {
    stars.forEach(star => {
      star.classList.remove('active');
      star.textContent = '☆';
    });
  }
});

function highlightStars(count) {
  stars.forEach((star, index) => {
    if (index < count) {
      star.classList.add('active');
      star.textContent = '★';
    } else {
      star.classList.remove('active');
      star.textContent = '☆';
    }
  });
}

document.getElementById('myForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('entry.1680065577', document.getElementById('name').value);
      formData.append('entry.1583928833', document.getElementById('rating').value);
      

      try {
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSc4rBfgtW5tloWSRJbxBp3J1mTLYieLBpxO5wapAy-qQupJ0w/formResponse', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });

        document.getElementById('successMessage').classList.add('show');
        document.getElementById('errorMessage').classList.remove('show');
        
        document.getElementById('myForm').reset();
        selectedRating = 0;
        stars.forEach(star => {
            star.textContent = '☆';
            star.classList.remove('active', 'selected');
        });

      } catch (error) {
        document.getElementById('errorMessage').classList.add('show');
        document.getElementById('successMessage').classList.remove('show');

        setTimeout(() => {
          document.getElementById('errorMessage').classList.remove('show');
        }, 5000);
      }
    });