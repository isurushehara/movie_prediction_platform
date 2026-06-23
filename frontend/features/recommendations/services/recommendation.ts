import api from "@/services/api";

export const RecommendationService = {

    getPersonalizedRecommendations(
        userId: number
    ) {
        return api.get(
            `/personalized/${userId}`
        );
    }
};