module Sm
  module Data
    
    DEFAULT_RESOURCE = :question

    def attributes_for_question(attributes_or_fixture = {})
      if attributes_or_fixture.is_a?(Hash)
        attributes = attributes_or_fixture
        fixture = DEFAULT_RESOURCE
      else
        attributes = {}
        fixture = attributes_or_fixture
      end

      default_attributes = case fixture
        when :question
          {
            :repetitions => 20,
            :kind => Exercise::KINDS[0].first,
            :variation => Exercise::VARIATIONS[0][2].first
          }
        else
          raise "Invalid fixture name"
      end
      default_attributes.merge(attributes)
    end 
    
    def new_question(attributes_or_fixture = {})
      Exercise.new(attributes_for_question(attributes_or_fixture))
    end

    def create_question(attributes_or_fixture = {})
      r = new_question(attributes_or_fixture)
      r.save
      r.reload
    end
  end
end