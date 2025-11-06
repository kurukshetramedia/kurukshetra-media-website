-- Seed categories
insert into public.categories (name, slug, description, color) values
('Top News', 'top-news', 'Most Important Stories', '#FF6B6B'),
('Technology', 'technology', 'Technology & Innovation', '#4ECDC4'),
('Politics', 'politics', 'Political News', '#95E1D3'),
('Sports', 'sports', 'Sports Updates', '#FFE66D'),
('Business', 'business', 'Business & Markets', '#A8E6CF'),
('Entertainment', 'entertainment', 'Entertainment & Culture', '#FFD3B6')
on conflict do nothing;

-- Seed display settings for homepage layouts
insert into public.display_settings (setting_key, setting_value) values
('featured_slider_enabled', 'true'),
('top_10_news_enabled', 'true'),
('trending_news_enabled', 'true'),
('category_display_layout', '["grid", "carousel"]'),
('items_per_page', '12')
on conflict do nothing;
