module ApplicationHelper
  def title(title)
    content_for :title do
      title
    end
    title
  end
end
