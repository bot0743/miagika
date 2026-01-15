document.addEventListener('DOMContentLoaded', function() {
  const articles = document.querySelectorAll('.c-blog-card');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const articleCount = document.getElementById('article-count');
  const articleWord = document.getElementById('article-word');
  
  // Функция для склонения слова "статья"
  function getArticleWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'статей';
    }
    
    switch (lastDigit) {
      case 1:
        return 'статья';
      case 2:
      case 3:
      case 4:
        return 'статьи';
      default:
        return 'статей';
    }
  }
  
  // Обновление счетчика и слова
  function updateCounter(count) {
    if (articleCount) {
      articleCount.textContent = count;
    }
    if (articleWord) {
      articleWord.textContent = getArticleWord(count);
    }
  }
  
  // Инициализация счетчика
  updateCounter(articles.length);
  
  // Фильтрация по тегам
  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedTag = this.dataset.tag;
      
      // Обновляем активную кнопку
      tagButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Фильтруем статьи
      let visibleCount = 0;
      
      articles.forEach(article => {
        if (selectedTag === 'all') {
          article.style.display = 'block';
          visibleCount++;
        } else {
          // Проверяем, есть ли у статьи нужный тег
          const articleTags = article.dataset.tags ? article.dataset.tags.split(',') : [];
          const tagElements = article.querySelectorAll('.c-blog-card__tag');
          let hasTag = false;
          
          // Проверяем data-tag у тегов внутри статьи
          tagElements.forEach(tagElement => {
            if (tagElement.dataset.tag === selectedTag) {
              hasTag = true;
            }
          });
          
          // Или проверяем через data-tags статьи
          if (articleTags.includes(selectedTag) || hasTag) {
            article.style.display = 'block';
            visibleCount++;
          } else {
            article.style.display = 'none';
          }
        }
      });
      
      // Обновляем счетчик
      updateCounter(visibleCount);
    });
  });
  
  // Клик по тегу в карточке статьи
  document.querySelectorAll('.c-blog-card__tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Останавливаем всплытие
      const tagName = this.dataset.tag;
      
      // Находим соответствующую кнопку фильтра и кликаем по ней
      const filterButton = document.querySelector(`.tag-btn[data-tag="${tagName}"]`);
      if (filterButton) {
        filterButton.click();
        
        // Прокрутка к фильтрам
        const tagsFilter = document.querySelector('.tags-filter');
        if (tagsFilter) {
          tagsFilter.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
