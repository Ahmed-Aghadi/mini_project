using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UIController : MonoBehaviour
{
    public Action OnRoadPlacement, OnHousePlacement, OnSpecialPlacement, OnDeleteItem;
    public Button placeRoadButton, placeHouseButton, placeSpecialButton, deleteItem;
    public TextMeshProUGUI connectWalletText, mapBalanceText;
    public Text roadText, houseText, specialText;

    public Color outlineColor;
    List<Button> buttonList;

    private void Start()
    {
        buttonList = new List<Button> { placeHouseButton, placeRoadButton, placeSpecialButton, deleteItem };
        // AddEventListeners();
    }

    public void AddEventListeners()
    {
        placeRoadButton.onClick.AddListener(() =>
        {
            ResetButtonColor();
            ModifyOutline(placeRoadButton);
            OnRoadPlacement?.Invoke();

        });
        placeHouseButton.onClick.AddListener(() =>
        {
            ResetButtonColor();
            ModifyOutline(placeHouseButton);
            OnHousePlacement?.Invoke();

        });
        placeSpecialButton.onClick.AddListener(() =>
        {
            ResetButtonColor();
            ModifyOutline(placeSpecialButton);
            OnSpecialPlacement?.Invoke();

        });
        deleteItem.onClick.AddListener(() =>
        {
            ResetButtonColor();
            ModifyOutline(deleteItem);
            OnDeleteItem?.Invoke();

        });
    }

    public void RemoveEventListeners()
    {
        ResetButtonColor();
        placeRoadButton.onClick.RemoveAllListeners();
        placeHouseButton.onClick.RemoveAllListeners();
        placeSpecialButton.onClick.RemoveAllListeners();
        deleteItem.onClick.RemoveAllListeners();
    }

    private void ModifyOutline(Button button)
    {
        var outline = button.GetComponent<Outline>();
        outline.effectColor = outlineColor;
        outline.enabled = true;
    }

    private void ResetButtonColor()
    {
        foreach (Button button in buttonList)
        {
            button.GetComponent<Outline>().enabled = false;
        }
    }

    public void updateMapBalance(int balance)
    {
        mapBalanceText.text = "Land Owned: " + balance.ToString();
    }

    public void updateRoadBalance(int balance)
    {
        roadText.text = "Road (" + balance + ")";
        // Debug.Log("update road balance: " + balance);
    }

    public void updateHouseBalance(int balance)
    {
        houseText.text = "House (" + balance + ")";
        // Debug.Log("update house balance: " + balance);
    }

    public void updateSpecialBalance(int balance)
    {
        specialText.text = "Special (" + balance + ")";
        // Debug.Log("update special balance: " + balance);
    }

    /*public void OnWalletConnect()
    {
        *//*overlay.enabled = false;*//*
        AddEventListeners();
    }

    public void OnWalletDisconnect()
    {
        *//*overlay.enabled = true;*//*
        RemoveEventListeners();
    }

    public void OnSwitchNetwork()
    {

    }*/
}
