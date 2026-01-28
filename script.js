document.getElementById('myForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('entry.1680065577', document.getElementById('name').value);

      try {
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSc4rBfgtW5tloWSRJbxBp3J1mTLYieLBpxO5wapAy-qQupJ0w/formResponse', {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });

        document.getElementById('successMessage').classList.add('show');
        document.getElementById('errorMessage').classList.remove('show');
        
        document.getElementById('myForm').reset();

      } catch (error) {
        document.getElementById('errorMessage').classList.add('show');
        document.getElementById('successMessage').classList.remove('show');

        setTimeout(() => {
          document.getElementById('errorMessage').classList.remove('show');
        }, 5000);
      }
    });