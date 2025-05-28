import { supabase } from "@/integrations/supabase/client";
import { TestQuestion } from "@/types";
import { safeRPC } from "@/api/utils/queryHelpers";

export const createTestQuestion = async (
  question: string, 
  options: string[], 
  correctAnswer: number
): Promise<TestQuestion> => {
  try {
    console.log("Creating test question:", { question, options, correctAnswer });
    
    // Используем RPC функцию для безопасного создания
    const { data, error } = await safeRPC('create_test_question', {
      p_question: question,
      p_options: JSON.stringify(options),
      p_correct_answer: correctAnswer
    });
    
    if (error) {
      console.error("Error creating test question:", error);
      throw error;
    }
    
    console.log("Test question created successfully:", data);
    
    // Приводим данные к формату TestQuestion
    const testQuestion: TestQuestion = {
      id: data[0].id,
      question: data[0].question,
      options: typeof data[0].options === 'string' ? JSON.parse(data[0].options) : data[0].options,
      correctAnswer: data[0].correct_answer
    };
    
    return testQuestion;
  } catch (error) {
    console.error("Error in createTestQuestion:", error);
    throw error;
  }
};

export const updateTestQuestion = async (
  id: string,
  question: string,
  options: string[],
  correctAnswer: number
): Promise<TestQuestion> => {
  try {
    console.log("Updating test question:", { id, question, options, correctAnswer });
    
    // Используем RPC функцию для безопасного обновления
    const { data, error } = await safeRPC('update_test_question', {
      p_id: id,
      p_question: question,
      p_options: JSON.stringify(options),
      p_correct_answer: correctAnswer
    });
    
    if (error) {
      console.error("Error updating test question:", error);
      throw error;
    }
    
    console.log("Test question updated successfully:", data);
    
    // Приводим данные к формату TestQuestion
    const testQuestion: TestQuestion = {
      id: data[0].id,
      question: data[0].question,
      options: typeof data[0].options === 'string' ? JSON.parse(data[0].options) : data[0].options,
      correctAnswer: data[0].correct_answer
    };
    
    return testQuestion;
  } catch (error) {
    console.error("Error in updateTestQuestion:", error);
    throw error;
  }
};

export const deleteTestQuestion = async (id: string): Promise<void> => {
  try {
    console.log("Deleting test question:", id);
    
    // Используем RPC функцию для безопасного удаления
    const { error } = await safeRPC('delete_test_question', { question_id: id });
    
    if (error) {
      console.error("Error deleting test question:", error);
      throw error;
    }
    
    console.log("Test question deleted successfully");
  } catch (error) {
    console.error("Error in deleteTestQuestion:", error);
    throw error;
  }
};

export const fetchTestQuestions = async (): Promise<TestQuestion[]> => {
  try {
    const { data, error } = await safeRPC('get_all_test_questions');
    
    if (error) {
      throw error;
    }
    
    // Преобразуем данные к формату TestQuestion
    const questions: TestQuestion[] = (data || []).map((item: any) => ({
      id: item.id,
      question: item.question,
      options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
      correctAnswer: item.correct_answer
    }));
    
    return questions;
  } catch (error) {
    console.error("Error fetching test questions:", error);
    return [];
  }
};
