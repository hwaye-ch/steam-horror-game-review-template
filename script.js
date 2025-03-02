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

    // Handle the Overall Rating category for top placement
    const ratingCategory = categories.find(category => category.name === "Overall Rating");
    if (ratingCategory) {
        const inputs = document.querySelectorAll(`input[name="${ratingCategory.name.toLowerCase().replace(/ /g, '')}"]`);
        let ratingText = `<p><strong>[h2] ${ratingCategory.name} [/h2]</strong><br>`;
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
        if (category.name !== "Overall Rating") {
            const categoryName = category.name;
            const inputs = document.querySelectorAll(`input[name="${categoryName.toLowerCase().replace(/ /g, '')}"]`);
            let resultText = `<p><strong>[h2] ${categoryName} [/h2]</strong><br>`;
            inputs.forEach(input => {
                if (input.checked) {
                    resultText += `☑ [b]${input.value}[/b]<br>`;
                } else {
                    resultText += `☐ ${input.value}<br>`;
                }
            });
            resultText += '</p>';
            resultDiv.innerHTML += resultText;
        }
    });

    // Add the Steam review template information
    resultDiv.innerHTML += `
        <p>Steam Horror Game Review Template by Hwaye</p>
        <p>[url=https://hwaye-ch.github.io/steam-horror-game-review-template/]https://hwaye-ch.github.io/steam-horror-game-review-template/[/url]</p>
    `;

    // Create and append the copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.onclick = copyToClipboard;
    resultDiv.appendChild(copyButton);

    // Clear any previous copy message
    document.getElementById('copyMessage').innerText = '';
}

function copyToClipboard() {
    const resultDiv = document.getElementById('result');
    const textToCopy = resultDiv.innerText.replace(/Copy/, '').trim(); // Remove the "Copy" text
    if (textToCopy !== '') {
        navigator.clipboard.writeText(textToCopy).then(() => {
            document.getElementById('copyMessage').innerText = 'Copied to clipboard';
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}
