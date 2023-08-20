using SVS;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class StructureManager : MonoBehaviour
{
    public StructurePrefabWeighted[] housesPrefabe, specialPrefabs;
    public PlacementManager placementManager;

    private float[] houseWeights, specialWeights;

    private void Start()
    {
        houseWeights = housesPrefabe.Select(prefabStats => prefabStats.weight).ToArray();
        specialWeights = specialPrefabs.Select(prefabStats => prefabStats.weight).ToArray();
    }

    public void DeleteItem(Vector3Int position, bool fromUser = true)
    {
        if (fromUser && placementManager.CheckIfPositionIsOwned(position) == false)
            return;
        if (placementManager.CheckIfPositionIsFree(position) == false)
        {
            if (fromUser) { ContractManager.Instance.DeleteItem(position); }
            ContractManager.Instance.updateEditedMap(position, CellType.Empty);
            placementManager.RemoveItem(position);
            AudioPlayer.instance.PlayPlacementSound();
        }
    }

    public void PlaceHouse(Vector3Int position, bool fromUser = true)
    {
        if (CheckPositionBeforePlacement(position, fromUser))
        {
            if (fromUser && ContractManager.Instance.AddHouse() == false)
                return;
            ContractManager.Instance.updateEditedMap(position, CellType.Structure);
            int randomIndex = GetRandomWeightedIndex(houseWeights);
            placementManager.PlaceObjectOnTheMap(position, housesPrefabe[randomIndex].prefab, CellType.Structure);
            AudioPlayer.instance.PlayPlacementSound();
        }
    }

    public void PlaceSpecial(Vector3Int position, bool fromUser = true)
    {
        if (CheckPositionBeforePlacement(position, fromUser))
        {
            if (fromUser && ContractManager.Instance.AddSpecial() == false)
                return;
            ContractManager.Instance.updateEditedMap(position, CellType.SpecialStructure);
            int randomIndex = GetRandomWeightedIndex(specialWeights);
            placementManager.PlaceObjectOnTheMap(position, specialPrefabs[randomIndex].prefab, CellType.SpecialStructure);
            AudioPlayer.instance.PlayPlacementSound();
        }
    }

    private int GetRandomWeightedIndex(float[] weights)
    {
        float sum = 0f;
        for (int i = 0; i < weights.Length; i++)
        {
            sum += weights[i];
        }

        float randomValue = UnityEngine.Random.Range(0, sum);
        float tempSum = 0;
        for (int i = 0; i < weights.Length; i++)
        {
            //0->weihg[0] weight[0]->weight[1]
            if (randomValue >= tempSum && randomValue < tempSum + weights[i])
            {
                return i;
            }
            tempSum += weights[i];
        }
        return 0;
    }

    private bool CheckPositionBeforePlacement(Vector3Int position, bool fromUser = true)
    {
        if (placementManager.CheckIfPositionInBound(position) == false)
        {
            Debug.Log("This position is out of bounds");
            return false;
        }
        if (placementManager.CheckIfPositionIsFree(position) == false)
        {
            Debug.Log("This position is not EMPTY");
            return false;
        }
        /*if(placementManager.GetNeighboursOfTypeFor(position,CellType.Road).Count <= 0)
        {
            Debug.Log("Must be placed near a road");
            return false;
        }*/
        if (fromUser && placementManager.CheckIfPositionIsOwned(position) == false)
        {
            Debug.Log("This land is not owned");
            return false;
        }
        return true;
    }
}

[Serializable]
public struct StructurePrefabWeighted
{
    public GameObject prefab;
    [Range(0, 1)]
    public float weight;
}
