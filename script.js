document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        
        const categoryTitle = document.createElement('strong');
        categoryTitle.innerText = category.name;
        
        categoryDiv.appendChild(categoryTitle);
        
        category.values.forEach(value => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="${category.name.toLowerCase().replace(/ /g, '')}" value="${value}"> ${value}`;
            categoryDiv.appendChild(label);
        });

        categoriesContainer.appendChild(categoryDiv);
    });
});

function generateReview() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Review Result:</h2>';

    // First handle the rating category for top placement
    const ratingCategory = categories.find(category => category.name === "Rating (1-10)");
    if (ratingCategory) {
        const inputs = document.querySelectorAll(`input[name="${ratingCategory.name.toLowerCase().replace(/ /g, '')}"]`);
        let ratingText = `<p><strong>--{ ${ratingCategory.name} }--</strong><br>`;
        inputs.forEach(input => {
            if (input.checked) {
                const rating = parseInt(input.value);
                const stars = '★'.repeat(rating) + '☆'.repeat(10 - rating);
                ratingText += `<span class="stars">${stars}</span><br>`;
            }
        });
        ratingText += '</p>';
        resultDiv.innerHTML += ratingText;
    }

    // Now handle other categories
    categories.forEach(category => {
        if (category.name !== "Rating (1-10)") {
            const categoryName = category.name;
            const inputs = document.querySelectorAll(`input[name="${categoryName.toLowerCase().replace(/ /g, '')}"]`);
            let resultText = `<p><strong>--{ ${categoryName} }--</strong><br>`;
            inputs.forEach(input => {
                if (input.checked) {
                    resultText += `☑ ${input.value}<br>`;
                } else {
                    resultText += `☐ ${input.value}<br>`;
                }
            });
            resultText += '</p>';
            resultDiv.innerHTML += resultText;
        }
    });

    resultDiv.innerHTML += '<button onclick="copyToClipboard()">Copy</button>';
    document.getElementById('copyMessage').innerText = '';
}

function copyToClipboard() {
    const resultDiv = document.getElementById('result');
    if (resultDiv.innerText !== '') {
        navigator.clipboard.writeText(resultDiv.innerText).then(() => {
            document.getElementById('copyMessage').innerText = 'Copied to clipboard';
        });
    }
}
