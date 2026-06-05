import { describe, it, expect, beforeEach } from "vitest";
import { useSessionStore } from "./session";

describe("useSessionStore", () => {
  beforeEach(() => {
    useSessionStore.getState().reset();
  });

  it("should initialize with null values and disconnected status", () => {
    const state = useSessionStore.getState();
    expect(state.campaignId).toBeNull();
    expect(state.sceneId).toBeNull();
    expect(state.connected).toBe(false);
  });

  it("should update campaignId", () => {
    useSessionStore.getState().setCampaignId("campaign-1");
    expect(useSessionStore.getState().campaignId).toBe("campaign-1");
  });

  it("should update sceneId", () => {
    useSessionStore.getState().setSceneId("scene-1");
    expect(useSessionStore.getState().sceneId).toBe("scene-1");
  });

  it("should update connected status", () => {
    useSessionStore.getState().setConnected(true);
    expect(useSessionStore.getState().connected).toBe(true);
  });

  it("should reset state", () => {
    useSessionStore.getState().setCampaignId("campaign-1");
    useSessionStore.getState().setSceneId("scene-1");
    useSessionStore.getState().setConnected(true);

    useSessionStore.getState().reset();

    const state = useSessionStore.getState();
    expect(state.campaignId).toBeNull();
    expect(state.sceneId).toBeNull();
    expect(state.connected).toBe(false);
  });
});
