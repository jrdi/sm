module AnswersHelper
  def answer_voted_by_user?(user_id, votes, value = 1)
    array = votes.map{ |vote| [vote.user_id, vote.value] }
    if array.assoc(user_id) == [user_id, value]
      return 'voted'
    end
  end

  def answer_votes_class(answer)
    'negative' if answer.votes_count < 0
  end

  def answer_votes_title(answer)
    votes_count = answer.votes.count
    title = "#{pluralize(votes_count, 'voto en total', 'votos totales')}"

    return title if votes_count < 1
    negative_votes = (votes_count - answer.votes_count)/2
    positive_votes = votes_count - negative_votes
    title << ": #{pluralize(positive_votes, 'positivo', 'positivos')}, "
    title << "#{pluralize(negative_votes, 'negativo', 'negativos')}"
  end

  def answer_votes_count(answer)
    caret = 'icon-caret-'

    if answer.votes_count < 0
      caret << "down"
    else
      caret << "up"
    end

    return "#{content_tag(:i, '', :class => caret)} #{answer.votes_count.abs}"
  end

  def answer_time(time)
    date = "<time datetime='#{time.iso8601}' title='#{time.iso8601}'"

    date << " class='timeago-js' " if (DateTime.now-time.to_date).to_i < 1

    date << ">#{time.to_date.to_s(:long)}</time>"

    return date.html_safe
  end
end
