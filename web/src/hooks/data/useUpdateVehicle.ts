import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleMutationsKeys } from '../../keys/mutations';
import updateCar from '../../services/car/updateCar';
import { UpdateVehicle, VehicleType } from '../../types';
import { vehicleQueriesKeys } from '../../keys/queries';

export const useUpdateVehicle = (vehicleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: vehicleMutationsKeys.updateVehicle(vehicleId),
        mutationFn: async (updateVehicleParams: UpdateVehicle) => {
            const response = await updateCar(vehicleId, updateVehicleParams);

            if (response?.status !== 200) {
                throw new Error();
            }

            return response.data;
        },
        onSuccess: (updatedVehicle: VehicleType) => {
            queryClient.setQueryData(
                vehicleQueriesKeys.getVehicles(),
                (oldData: VehicleType[]) => {
                    return oldData.map((vehicle) => {
                        if (vehicle.id === updatedVehicle.id) {
                            return { ...vehicle, ...updatedVehicle };
                        }

                        return vehicle;
                    });
                }
            );
        },
    });
};