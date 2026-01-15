document.addEventListener('DOMContentLoaded', function() {
  const articles = document.querySelectorAll('.c-blog-card');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const articleCount = document.getElementById('article-count');
  
  // Собираем все уникальные теги из статей
  const allTags = new Set();
  articles.forEach(article => {
    const tags = article.getAttribute('data-tags').split(',');
    tags.forEach(tag => allTags.add(tag.trim()));
  });
  
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
        const articleTags = article.getAttribute('data-tags').split(',').map(t => t.trim());
        
        if (selectedTag === 'all' || articleTags.includes(selectedTag)) {
          article.style.display = 'block';
          visibleCount++;
          
          // Плавное появление
          article.style.opacity = '0';
          setTimeout(() => {
            article.style.transition = 'opacity 0.3s';
            article.style.opacity = '1';
          }, 10);
        } else {
          article.style.display = 'none';
        }
      });
      
      // Обновляем счетчик
      articleCount.textContent = visibleCount;
    });
  });
  
  // Клик по тегу в карточке статьи
  document.querySelectorAll('.c-blog-card__tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const tagName = this.dataset.tag;
      
      // Находим соответствующую кнопку фильтра и кликаем по ней
      const filterButton = document.querySelector(`.tag-btn[data-tag="${tagName}"]`);
      if (filterButton) {
        filterButton.click();
        
        // Прокрутка к фильтрам
        document.querySelector('.tags-filter').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
